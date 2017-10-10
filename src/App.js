import React, { Component } from 'react';
import './App.css';

import { HashRouter, Route } from 'react-router-dom'

import Login from './components/login/Login'
import Dashboard from "./components/dashboard/Dashboard"
import NavBar from "./components/navbar/NavBar"
import Customers from "./components/customers/Customers"
import Repairs from "./components/repairs/Repairs"

class App extends Component {
  render() {
    return (
      <div>
        
      <HashRouter>
        <div>
          <NavBar />
          <Route component={Login} exact path='/' />
          <Route component={Dashboard} path='/dashboard' />
          <Route component={NavBar} path='/nav' />
          <Route component={Customers} path="/customers" />
          <Route component={Repairs} path="/repairs" />
          </div>
      </HashRouter>
      </div>

    );
  }
}

export default App;
