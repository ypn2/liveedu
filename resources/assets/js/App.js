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
  }

  render(){
    return(
      <Router>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/trainer-management" component={LoginAttemptPage} />
          <Route component={FrontendMaster} />
        </Switch>

      </Router>
    )
  }
}

const fakeAuth = {
  isAuthenticated: true,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const LoginAttemptPage = () => (<AttemtLogin/>)

class LoginPage extends React.Component {

  constructor(){
    super();
    this.state = {
      redirectToReferrer: false,
      attemptLogin:false
    };
  }

  componentDidMount(){
    var _self = this;
    StoresLogin.once('EVENT_LOGIN',function(data){
      if(data.status == 'success'){
        fakeAuth.authenticate(() => {
          _self.setState({ redirectToReferrer: true });
        });
      }else{
        _self.setState({
          attemptLogin:true
        })
      }
    });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <div>
        {
          !this.state.attemptLogin ?
            <Login/>
          :<LoginAttemptPage/>
        }
      </div>

    );
  }
}

export default App;
