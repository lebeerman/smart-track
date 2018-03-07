import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { SecureRoute, ImplicitCallback, withAuth } from '@okta/okta-react';

import Navigation from './components/shared/Navigation';
import UserHome from './components/home/UserHome';
import SplashHome from './components/home/SplashHome';
import RegistrationForm from './components/auth/RegistrationForm';
import LoginPage from './components/auth/LoginPage';
import ProfilePage from './components/auth/ProfilePage';
import config from './app.config';
import './App.css';

// Consider starting over. 
// https://codepen.io/saoirsezee/pen/yOrVra


export default withAuth(
  class App extends React.Component {
    constructor(props) {
      //checking okta for auth setting - determines if the home page will render user content or a splash page
      super(props);
      console.log('constructing!');
      this.state = {
        authenticated: null,
        user: {
          email: '',
          profile: {}
        },
        goals: []
      };
      this.goalsUrl = 'https://smart-trak.herokuapp.com/goals';
      this.usersUrl = 'https://smart-trak.herokuapp.com/api/users/db';
      this.checkAuthentication = this.checkAuthentication.bind(this);
      this.checkAuthentication();
    }

    async checkAuthentication() {
      const authenticated = await this.props.auth.isAuthenticated();
      if (authenticated !== this.state.authenticated) {
        this.setState({ authenticated });
      }
    }

    componentDidMount() {
      console.log('Mounting!');
      this.checkAuthentication();
      this.getCurrentUser();
    }

    getCurrentUser() {
      // gets the user info from te okta API then updates user goals from smart-trak API
      this.props.auth.getUser().then(user => {
        console.log('CURRENT USER: ', user);
        this.setState({ user: user });
        user ? this.getUserGoals(user) : null;
      });
    }

    getUserGoals = user => {
      // chained to componentDidMount - gets goals from smart-trak API
      fetch('http://localhost:3001/goals')
        .then(res => res.json())
        .then(res => {
          const userGoalList = res.goals.filter(item => {
            return this.state.user.email === item.owner;
          });
          this.setState({ goals: userGoalList });
          console.log('GETTIN GOALS: ', this.state.goals);
        });
    };

    render() {
      if (this.state.authenticated === null) return null;
      const homeView = this.state.authenticated ? 
        <Route path="/" render={() => <UserHome {...this.state}/>} /> : 
        <Route path="/" render={() => <SplashHome {...this.state}/>} />;
      return (
        <div className="App">
          <Navigation />
          <main>
            {homeView}
            <Route path="/login" render={() => <LoginPage baseUrl={config.url} />} />
            <Route path="/implicit/callback" component={ImplicitCallback} />
            <Route path="/register" component={RegistrationForm} />
            <SecureRoute path="/profile" component={ProfilePage} />
          </main>
        </div>
      );
    }
  }
);