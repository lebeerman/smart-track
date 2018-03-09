import { Link } from 'react-router-dom';
import React from 'react';
import { withAuth } from '@okta/okta-react';
import { AddaGoalForm } from './AddaGoal.js';

export default withAuth(
  class HomePage extends React.Component {
    constructor(props) {
      //checking okta for auth setting - determines if the home page will render user content or a splash page
      super(props);
      console.log('constructing!');
      this.state = {
        authenticated: null,
        user: {
          email: ''
        },
        profile: {
          firstName: 'Dan',
          lastName: 'Beerman',
          email: 'shitfuck@butt.com'
        },
        goals: []
      };
      this.goalsUrl = 'http://localhost:3001/goals';
      this.usersUrl = 'https://smart-trak.herokuapp.com/api/users/db';
      this.checkAuthentication = this.checkAuthentication.bind(this);
      this.checkAuthentication();
    }

    async checkAuthentication() {
      console.log('ASYNC AUTHING!');
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
          console.log('GETTIN GOALS: ', this.state.goals);
        });
    };

    loadGoals = goals => {
      // adds a div with the current goals - rendered on auth homepage
      console.log('LOAD GOALS: ', goals);
      return <div className="card" key={goals.id}>
          <div className="card-header">
            <h1 className="card-title">{goals.goal}</h1>
            <p>{goals.dueDate}</p>
          </div>
          <div className="card-body">{goals.complete ? <h3>DONE</h3> : <h3>NOT DONE</h3>}</div>
          <div className="card-footer">
            {/* <button onClick={e => {
                e.preventDefault();
                this.editGoal(goals.id);
              }}>
              Edit
            </button> */}
            {goals.complete ? <button onClick={e => {
                  e.preventDefault();
                  this.completeGoal(goals.id);
                }}>
                Not Completed!
              </button> : <button onClick={e => {
                  e.preventDefault();
                  this.completeGoal(goals.id);
                }}>
                Completed!
              </button>}
            <button onClick={e => {
                e.preventDefault();
                this.removeGoal(goals.id);
              }}>
              Remove
            </button>
          </div>
        </div>;
    };

    addGoal(event) {
      // Assemble data, post goal to heroku on user submssion
      console.log('New Goal: ', event.target);
      const formElement = event.target;
      const formData = new FormData(formElement);
      const newGoal = {
        goal: formData.get('newGoal'),
        dueDate: formData.get('dueDate'),
        owner: this.state.user.email,
        complete: false
      };
      console.log(newGoal);
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
          console.log('ADD GOAL', newGoals);
          this.setState({ goals: newGoals });
        })
        .catch(err => console.log(err));
    }

    removeGoal = id => {
      // remove a goal from front and back end.
      fetch(this.goalsUrl + '/' + id, {
        method: 'DELETE',
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
        .then(res => res.json())
        .then(res => {
          console.log('DELETED GOAL!', res);
        })
        .catch(err => console.log(err.text));
      const remainder = this.state.goals.filter(item => {
        if (item.id !== id) return item;
      });
      this.setState({ goals: remainder });
    };

    editGoal = id => {
      return fetch('https://smart-trak.herokuapp.com/goals' + '/' + id, {
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
          console.log('complete',item);
          fetch('https://smart-trak.herokuapp.com/goals' + '/' + id, {
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
          {/* BREAK OUT GOALS LIST COMPONENT */}
          {this.state.goals.map(item => this.loadGoals(item))}
        </div> : <div className="splash">
          <div className="call-to-action">
            <button className="register"> 
              <Link to="/register">CREATE AN ACCOUNT</Link>
            </button>
            <button href="javascript:void(0)" onClick={this.props.auth.login}>
              SIGN IN
            </button>
          </div>
          <div>
            <h3>Why set goals with Smart Trak?</h3>
            <ul>
              <li>Goals guide your focus and steer behavior.</li>
              <li>Goal setting promotes self-mastery.</li>
              <li>Goals sustain momentum.</li>
            </ul>
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
