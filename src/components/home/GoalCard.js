import React from 'react';
import DateTime from 'react-datetime';
import './DateTime.css';
import Moment from 'react-moment';

export class GoalCard extends React.Component {
  render() {
    return <div className="card" key={this.props.goals.id}>
        {console.log('Card Props: ', this.props)}
        <div className="card-header">
          <h1 className="card-title">{this.props.goals.goal}</h1>
          <Moment format="M/DD/YYYY HH:mm"> 
            {this.props.goals.dueDate} 
          </Moment>
        </div>
        <div className="card-status">{this.props.goals.complete ? <h3>DONE</h3> : <h3>NOT DONE</h3>}</div>
        <div className="card-footer">
          {/* <button onClick={e => {
                      e.preventDefault();
                      this.editGoal(this.props.goals.id);
                    }}>
                    Edit
                  </button> */}
          {this.props.goals.complete ? <button onClick={e => {
                e.preventDefault();
                this.props.completeGoal(this.props.goals.id);
              }}>
              Not Completed!
            </button> : <button className="register" onClick={e => {
                e.preventDefault();
                this.props.completeGoal(this.props.goals.id);
              }}>
              ✓
            </button>}
          <button className="remove" onClick={e => {
              e.preventDefault();
              this.props.removeGoal(this.props.goals.id);
            }}>
            ✖
          </button>
        </div>
      </div>;
  }
}
