import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Route,Redirect,Switch } from "react-router-dom";
import Login from './themes/neymar/Login';
import FrontendMaster from './themes/neymar/frontend_pages/FrontendMaster';
import ThemeRoot from './themes/neymar/dashboard/ThemeRoot';

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

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/trainer-management" component={AdminRoot} />
            <Route component={FrontendMaster}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
