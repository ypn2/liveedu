import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Route,Redirect,Switch } from "react-router-dom";
import Login from './themes/neymar/Login';
import FrontendMaster from './themes/neymar/frontend_pages/FrontendMaster';
import ThemeRoot from './themes/neymar/dashboard/ThemeRoot';
import InternalDocuments from './themes/neymar/internal_documents/InternalDocuments';


const LoginPage = () => (
  <Login/>
)

const FrontendMasterPage = () => (
  <FrontendMaster/>
)


const AdminRoot = () => (
  <ThemeRoot/>
)

const InternalDocumentsPage = ()=>(
  <InternalDocuments/>
)

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


// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={props =>
//       fakeAuth.isAuthenticated ? (
//         <Component {...props} />
//       ) : (
//         <Redirect
//           to={{
//             pathname: "/login",
//             state: { from: props.location }
//           }}
//         />
//       )
//     }
//   />
// );

class PrivateRoute extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      authenticate:false
    }
  }

  render(){

    const {authenticate} = this.state;
    const { component: Component, ...rest } = this.props;

    return(
      <Route
        {...rest}
        render={props =>
          authenticate ? (
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
    )
  }
}

PrivateRoute.propTypes = {
  component: Component,
  ...rest
};


class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      redirectToReferrer: false
    }

  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={FrontendMasterPage} />
          <Route path="/fr" component={FrontendMasterPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/trainer-management" component={AdminRoot} />
        </div>
      </Router>
    );
  }
}

export default App;
