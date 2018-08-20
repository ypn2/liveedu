import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch,
} from "react-router-dom";

import { loadProgressBar } from 'axios-progress-bar';
import axios from 'axios';
import 'axios-progress-bar/dist/nprogress.css';

loadProgressBar(

  {
    minimum: 0.08,
    easing: 'linear',
    positionUsing: '',
    speed: 200,
    trickle: true,
    trickleSpeed: 200,
    showSpinner: false,
    barSelector: '[role="bar"]',
    spinnerSelector: '[role="spinner"]',
    parent: 'body',
    template: '<div class="bar" role="bar"><div class="peg"></div></div>'
  }


);

import './App.css';
import Login from './themes/neymar/Login';
import FrontendMaster from './themes/neymar/frontend_pages/FrontendMaster';
import ThemeRoot from './themes/neymar/dashboard/ThemeRoot';
import AttemtLogin from './themes/neymar/LoginAttempt';
import StoresLogin from './stores/StoresLogin';


////////////////////////////////////////////////////////////
// 1. Click the public page
// 2. Click the protected page
// 3. Log in
// 4. Click the back button, note the URL each time



class App extends React.Component{

  constructor(){
    super();

    this.state = {
      authenticate:null,
      attemptLogin:false
    }

  }

  componentWillMount(){

    var _self = this;

    axios.post('/api/check')
    .then(function(response){
      _self.setState({
        authenticate:response.data
      })
    })
    .catch(function(err){
      
    })


    StoresLogin.on('EVENT_LOGIN',function(data){
      if(data.status == 'success'){
        _self.setState({
          authenticate:true
        })
      }else{
        _self.setState({
          attemptLogin:true,
          authenticate:false
        })
      }
    });

    StoresLogin.on('EVENT_LOGOUT',function(){
      _self.setState({
        authenticate:false
      })
    })

  }

  render(){

    const _log = this.state.attemptLogin ? <AttemtLogin/> : <Login/>;

    return(
      <div>
        {
          this.state.authenticate!=null ?
          <div>
            {
                !this.state.authenticate ? _log :(
                <Router>
                  <Switch>
                    <Route path="/trainer-management" component={ThemeRoot} />
                    <Route component={FrontendMaster} />
                  </Switch>
                </Router>
              )
            }
          </div>
          : null
        }
      </div>

    )
  }
}

export default App;
