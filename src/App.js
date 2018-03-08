import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { SecureRoute, ImplicitCallback } from '@okta/okta-react';

import Navigation from './components/shared/Navigation';
import HomePage from './components/home/HomePage';
import RegistrationForm from './components/auth/RegistrationForm';
import config from './app.config';
import LoginPage from './components/auth/LoginPage';
import ProfilePage from './components/auth/ProfilePage';
import './App.css';

import styled from 'styled-components';



export default class App extends Component {
  state={
    error:''
  }
  render() {
//  const Main = styled.div`
//    background-color: #2f4858;
//    width: 300px;
//    min-height: 200px;
//    margin: 30px auto;
//    box-sizing: border-box;`;

//  const Header = styled.h2`
//    padding: 10px 20px;
//    text-align: center;
//    color: black;
//    fontsize: 22px;`;

//  const ErrorMessage = styled.p`
//    color: white;
//    font-size: 13px;`;
//   <Header>
// </Header>
// <Navigation />
// <Main>
// </Main>
      return (
        <div className="App" >
          <div className="App-header" >
            <div className="App-title">
              <h1>SMART TRAK</h1>
              <p>Set your aim and hit your targets</p>
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
        </div>
    );
  }
}
