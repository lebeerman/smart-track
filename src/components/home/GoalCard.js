import React from 'react';
import DateTime from 'react-datetime';
import './DateTime.css';
import Moment from 'react-moment';

export class GoalCard extends React.Component {
  render() {
    return <div key={this.props.goals.id}>
        {this.props.goals.complete ? <div className="card">
            <div className="card-header">
              <h3 className="card-title">{this.props.goals.goal}</h3>
              <Moment format="M/DD/YYYY HH:mm">{this.props.goals.dueDate}</Moment>
            </div>
            <button className="incomplete" onClick={e => {
                e.preventDefault();
                this.props.completeGoal(this.props.goals.id);
              }}>
              Incomplete
            </button>
            <button className="cancel" onClick={e => {
                e.preventDefault();
                this.props.removeGoal(this.props.goals.id);
              }}>
              ✖
            </button>
          </div> : <div className="card" key={this.props.goals.id}>
            <div className="card-header">
              <h1 className="card-title">{this.props.goals.goal}</h1>
              <label>Due: </label><span> <Moment format="M/DD/YYYY HH:mm">{this.props.goals.dueDate}</Moment></span>
            </div>
            <div className="card-footer">
              {this.props.goals.complete ? <button className="complete" onClick={e => {
                    e.preventDefault();
                    this.props.completeGoal(this.props.goals.id);
                  }}>
                   Completed
                </button> : <button className="complete" onClick={e => {
                    e.preventDefault();
                    this.props.completeGoal(this.props.goals.id);
                  }}>
                  Complete!
                </button>}
            </div>
          </div>}
      </div>;
  }
}
