import React from 'react';
import { withAuth } from '@okta/okta-react';

export default withAuth(class ProfilePage extends React.Component {
  constructor(props){
    super(props);
    this.state = { user: null, goals:[] };
    this.goalsUrl = 'https://smart-trak.herokuapp.com/goals/';
    this.getCurrentUser = this.getCurrentUser.bind(this);
  }

  async getCurrentUser(){
    this.props.auth.getUser()
      .then(user => this.setState({user}));
  }

  componentDidMount(){
    this.getCurrentUser();
  }

  getGoalNumber = (userEmail) => {
  // chained to componentDidMount - gets goals from smart-trak API
  fetch(this.goalsUrl)
    .then(res => res.json())
    .then(res => {
      const userGoalList = res.goals.filter(item => {
        return userEmail === item.owner;
      });
      this.setState({ goals: userGoalList });
    });
    return this.state.goals.length;
  }

  render() {
    if(!this.state.user) return null;
    return <section className="user-profile">
        <h1>User Profile</h1>
        <p>*New features coming soon!</p>
        <div>
          <label>Name: </label>
          <span> {this.state.user.name}</span>
        </div>
        <div>
          <label>Email: </label>
          <span> {this.state.user.email}</span>
        </div>
        <div>
          <label>Number of Goals: </label>
          <span> {this.getGoalNumber(this.state.user.email)}</span>
        </div>
      </section>;
  }
})