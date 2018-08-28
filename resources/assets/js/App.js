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
import ThemeContext from './themes/neymar/configs/context';
import Personalize from './themes/neymar/personalize/PersonalizeMaster';

import lang from './themes/neymar/langs/vi';


////////////////////////////////////////////////////////////
// 1. Click the public page
// 2. Click the protected page
// 3. Log in
// 4. Click the back button, note the URL each time



class App extends React.Component{

  constructor(){
    super();

    this.state = {
      user:null,
      authenticate:null,
      attemptLogin:false
    }

  }

  componentWillMount(){

    var _self = this;

    axios.post('/api/check')
    .then(function(response){
      if(response.data!=0){
        _self.setState({
          user:response.data,
          authenticate:true
        })
      }else{
        _self.setState({
          authenticate:false
        })
      }
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

              <ThemeContext.Provider value={{
                  user:this.state.user,
                  txt_nav_menus:lang.txt_nav_menus,
                  txt_input_control:lang.txt_input_control,
                  lang
                }}>
                <Router>
                  <Switch>
                    <Route path="/trainer-management" component={ThemeRoot} />
                    <Route path="/personalize" component={Personalize} />
                    <Route component={FrontendMaster} />
                  </Switch>
                </Router>
              </ThemeContext.Provider>
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
