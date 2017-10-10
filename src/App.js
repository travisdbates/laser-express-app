import React, { Component } from 'react';
import './App.css';

import { HashRouter, Route } from 'react-router-dom'

import Login from './components/login/Login'
import Dashboard from "./components/dashboard/Dashboard"
import NavBar from "./components/navbar/NavBar"

class App extends Component {
  render() {
    return (

      <HashRouter>
        <div>
          <Route component={Login} exact path='/' />
          <Route component={Dashboard} path='/dashboard' />
          <Route component={NavBar} path='/nav' />
        </div>
      </HashRouter>

    );
  }
}

export default App;
