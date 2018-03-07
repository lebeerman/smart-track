import React from 'react';
import { Route } from 'react-router-dom';
import { SecureRoute, ImplicitCallback } from '@okta/okta-react';

export const GoalCard = ({ goals }) => {
  return (
    <div key={goals.id}>
    {console.log(this.props)}
      <h1>{goals.goal}</h1>
      <h3>{goals.complete}</h3>
      <p>{goals.dueDate}</p>
      <button
        onClick={e => {
          e.preventDefault();
          this.props.editGoal(goals.id);
        }}
      >
        Edit
      </button>
      <button
        onClick={e => {
          e.preventDefault();
          this.props.completeGoal(goals.id);
        }}
      >
        Complete
      </button>
      <button
        onClick={e => {
          e.preventDefault();
          this.props.removeGoal(goals.id);
        }}
      >
        Remove
      </button>
    </div>
  );
};
