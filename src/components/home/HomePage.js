import React from 'react';
import { Link } from 'react-router-dom';
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
      this.goalsUrl = 'https://smart-trak.herokuapp.com/goals';
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

    loadGoals = goals => {
      // adds a div with the current goals - rendered on auth homepage
      console.log('LOAD GOALS: ', goals);
      return (
        <div key={goals.id}>
          <h1>{goals.goal}</h1>
          <h3>{goals.complete}</h3>
          <p>{goals.dueDate}</p>
          <button onClick={(e) => {
              e.preventDefault();
              this.editGoal(goals.id);
            }} >
            Edit
          </button>          
          <button
            onClick={(e) => {
              e.preventDefault();
              this.completeGoal(goals.id);
            }} >
            Complete
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              this.removeGoal(goals.id);
            }} >
            Remove
          </button>
        </div>
      );
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
      fetch('http://localhost:3001/goals', {
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
      // .then(() => this.componentDidMount())
      fetch('http://localhost:3001/goals' + '/' + id, {
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

    editGoals = id => {
      return fetch(this.goalsURL + '/' + id, {
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
          fetch(this.goalsURL + '/' + id, {
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
      this.setState({goals : updatedGoals});
    };

    render() {
      if (this.state.authenticated === null) return null;
      const homeView = this.state.authenticated ? (
        <div className="user-content">
          <AddaGoalForm addGoal={this.addGoal.bind(this)} />
          {/* BREAK OUT GOALS LIST COMPONENT */}
          {this.state.goals.map(item => this.loadGoals(item))}
        </div>
      ) : (
        <div className="splash">
          <Link to="/register">CREATE AN ACCOUNT</Link>
          <a href="javascript:void(0)" onClick={this.props.auth.login}>
            SIGN IN
          </a>
          <div>
            <h3>Why set goals with Smart Trak?</h3>
            <ul>
              <li>Goals guide your focus and steer behavior.</li>
              <li>Goal setting promotes self-mastery.</li>
              <li>Goals sustain momentum.</li>
            </ul>
          </div>
        </div>
      );
      return (
        <div>
          <div className="slug">
            {/* BREAK OUT TITLE COMPONENT */}
            <h1>SMART TRAK</h1>
            <p>Set your aim and hit your targets</p>
          </div>
          {homeView}
        </div>
      );
    }
  }
);
