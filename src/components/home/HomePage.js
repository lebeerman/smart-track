import { Link } from 'react-router-dom';
import React from 'react';
import { withAuth } from '@okta/okta-react';
import { AddaGoalForm } from './AddaGoal.js';
import { GoalCard } from "./GoalCard.js";

export default withAuth(
  class HomePage extends React.Component {
    constructor(props) {
      //checking okta for auth setting - determines if the home page will render user content or a splash page
      super(props);
      this.state = {
        authenticated: null,
        user: {
          email: ''
        },
        profile: {
          firstName: 'Dan',
          lastName: 'Beerman',
          email: ''
        },
        goals: []
      };
      this.goalsUrl = 'https://smart-trak.herokuapp.com/goals/';
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
      this.checkAuthentication();
      this.getCurrentUser();
    }

    getCurrentUser() {
      // gets the user info from te okta API then updates user goals from smart-trak API
      this.props.auth.getUser().then(user => {
        this.setState({ user: user });
        if(user) this.getUserGoals(user);
      });
    }

    getUserGoals = user => {
      // chained to componentDidMount - gets goals from smart-trak API
      fetch(this.goalsUrl)
        .then(res => res.json())
        .then(res => {
          const userGoalList = res.goals.filter(item => {
            return this.state.user.email === item.owner;
          });
          this.setState({ goals: userGoalList });
        });
    };

    loadGoals = goals => {
      // adds a div with the current goals - rendered on auth homepage
      return <GoalCard goals={goals} completeGoal={this.completeGoal} removeGoal={this.removeGoal} />;
    };

    addGoal(event) {
      // Assemble data, post goal to heroku on user submssion
      const formElement = event.target;
      const formData = new FormData(formElement);
      const newGoal = {
        goal: formData.get('newGoal'),
        dueDate: formData.get('dueDate'),
        owner: this.state.user.email,
        complete: false
      };
      fetch(this.goalsUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newGoal)
      })
        .then(res => res.json())
        .then(res => {
          const newGoals = this.state.goals;
          newGoals.push(res.goal);
          this.setState({ goals: newGoals });
        })
        .catch(err => console.log(err));
    }

    removeGoal = id => {
      // remove a goal from front and back end.
      fetch(this.goalsUrl + id, {
        method: 'DELETE',
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
        .then(res => res.json())
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err));
      const remainder = this.state.goals.filter(item => {
        if (item.id !== id) return item;
      });
      this.setState({ goals: remainder });
    };

    editGoal = id => {
      return fetch(this.goalsUrl + id, {
        method: 'PUT',
        body: JSON.stringify(this.state.goals.filter(item => item.id !== id)),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
        .then(res => res.json())
        .catch(err => console.log(err));
    };

    completeGoal = id => {
      var updatedGoals = this.state.goals.forEach(item => {
        if(item.id === id) {
          item.complete = (!item.complete);
          fetch(this.goalsUrl + id, {
            method: 'PUT',
            body: JSON.stringify(item),
            headers: new Headers({
              'Content-Type': 'application/json'
            })
          })
            .then(res => res.json())
            .catch(err => console.log(err));
        }
      });
      this.setState({updatedGoals});
    };

    render() {
      if (this.state.authenticated === null) return null;
      const homeView = this.state.authenticated ? <div className="user-content">
          <AddaGoalForm addGoal={this.addGoal.bind(this)} />
          {this.state.goals.map(item => this.loadGoals(item))}
        </div> : <div className="splash">
          <div className="call-to-action">
            <Link className="create" to="/register">
              CREATE AN ACCOUNT
            </Link>
            <button href="javascript:void(0)" onClick={this.props.auth.login}>
              SIGN IN
            </button>
          </div>
          <div className="splash-text">
            <h1>Why use Smart Trak?</h1>
            <h3>Goals guide your focus and steer behavior.</h3>
            <h3>Goal setting promotes self-mastery.</h3>
            <h3>Goals sustain momentum.</h3>
          </div>
        </div>;
      return (
        <div>
          {homeView}
        </div>
      );
    }
  }
);
