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

import StoresLogin from './stores/StoresLogin';


////////////////////////////////////////////////////////////
// 1. Click the public page
// 2. Click the protected page
// 3. Log in
// 4. Click the back button, note the URL each time

const App = () => (
  <Router>
    <Switch>
      <Route path="/login" component={LoginPage} />
      <PrivateRoute path="/trainer-management" component={ThemeRoot} />
      <PrivateRoute component={FrontendMaster} />
    </Switch>
  </Router>
);

const fakeAuth = {
  isAuthenticated: false,
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

const Public = () => <h3>Public</h3>;
const Protected = () => <h3>Protected</h3>;

class LoginPage extends React.Component {

  constructor(){
    super();
    this.state = {
      redirectToReferrer: false
    };


  }

  componentDidMount(){
    var _self = this;

    StoresLogin.on('LOGIN_SUCCESS',function(){
      fakeAuth.authenticate(() => {
        _self.setState({ redirectToReferrer: true });
      });
    });
  }


  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <Login/>
    );
  }
}

export default App;
