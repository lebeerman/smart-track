import React from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import { AddaGoalForm } from './AddaGoal.js';
import { GoalCard } from './GoalCard.js';

export default withAuth(
  class UserHome extends React.Component {
    constructor(props) {
      super(props);
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
      return (
        <div>
          <AddaGoalForm addGoal={this.addGoal.bind(this)} />
          {this.state.goals.map(item => (
            <GoalCard
              goals={item}
              completeGoal={this.completeGoal}
              editGoal={this.editGoal}
              removeGoal={this.removeGoal}
            />
          ))}
        </div> 
      );
    }
  }
);
