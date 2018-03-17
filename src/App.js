import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { SecureRoute, ImplicitCallback } from '@okta/okta-react';

import Navigation from './components/shared/Navigation';
import HomePage from './components/home/HomePage';
import RegistrationForm from './components/auth/RegistrationForm';
import config from './app.config';
import LoginPage from './components/auth/LoginPage';
import ProfilePage from './components/auth/ProfilePage';
import logo from './white-check.png';
import './App.css';


export default class App extends Component {
  state={
    error:''
  }
  render() {
      return <div className="App">
          <div className="App-header">
            <div className="App-title">
              <img src={ logo } alt="White Checkmark" className="App-logo" />
              <h1>SMART TRAK</h1>
            </div>
            <Navigation />
          </div>
          <main>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" render={() => <LoginPage baseUrl={config.url} />} />
            <Route path="/implicit/callback" component={ImplicitCallback} />
            <Route path="/register" component={RegistrationForm} />
            <SecureRoute path="/profile" component={ProfilePage} />
          </main>
        </div>;
  }
}
