import React from 'react';
import { Link } from 'react-router-dom';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';

import config from '../../app.config';

export default withAuth(
  class RegistrationForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        sessionToken: null
      };
      this.oktaAuth = new OktaAuth({ url: config.url });
      this.checkAuthentication = this.checkAuthentication.bind(this);
      this.checkAuthentication();

      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
      this.handleLastNameChange = this.handleLastNameChange.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    async checkAuthentication() {
      const sessionToken = await this.props.auth.getIdToken();
      if (sessionToken) {
        this.setState({ sessionToken });
      }
    }
    componentDidUpdate() {
      this.checkAuthentication();
    }
    handleFirstNameChange(e) {
      this.setState({ firstName: e.target.value });
    }
    handleLastNameChange(e) {
      this.setState({ lastName: e.target.value });
    }
    handleEmailChange(e) {
      this.setState({ email: e.target.value });
    }
    handlePasswordChange(e) {
      this.setState({ password: e.target.value });
    }

    handleSubmit(e) {
      e.preventDefault();
      console.log('HANDLED: ', this.state);
      fetch('/api/users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      })
        .then(user => {
          this.oktaAuth
            .signIn({
              username: this.state.email,
              password: this.state.password
            })
            .then(res =>
              this.setState({
                sessionToken: res.sessionToken
              })
            );
        })
        .catch(err => console.log);
    }

    render() {
      if (this.state.sessionToken) {
        this.props.auth.redirect({ sessionToken: this.state.sessionToken });
        return null;
      }

      return <form id="forms" onSubmit={this.handleSubmit}>
          <h3>Sign up</h3>
          <div className="form-element">
            <input type="email" id="email"  required="required" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} />
          </div>
          <div className="form-element">
            <input type="text" id="firstName"  required="required" placeholder="First Name" value={this.state.firstName} onChange={this.handleFirstNameChange} />
          </div>
          <div className="form-element">
            <input type="text" id="lastName"  required="required" placeholder="Last Name" value={this.state.lastName} onChange={this.handleLastNameChange} />
          </div>
          <div className="form-element">
            <input type="password" id="password" required="required" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} />
          </div>
          <input className="register" type="submit" id="submit" value="SIGN UP" />
        </form>;
    }
  }
);
