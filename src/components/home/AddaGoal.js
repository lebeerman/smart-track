import React from 'react';
import DateTime from 'react-datetime';
import './DateTime.css';

export const AddaGoalForm = ({ addGoal, handleDate }) => {
  return <div className="add-box">
      <h1>New Goal</h1>
      <form 
        onSubmit={e => {
        e.preventDefault();
        addGoal(e);
      }}>
        <label>S.M.A.R.T. Goal</label>
        <br />
        <textarea 
          className="form-control col-md-12" 
          name="newGoal" 
          placeholder="Write your SMART Goal Here!" 
          value={this.value}
        />
        <br />
        <label>Set a due date:</label>
        <DateTime value={this.value}
          inputProps={{ name:'dueDate', placeholder: 'DUE DATE', disabled: false }} 
        />
        <input type="submit" value="SUBMIT" />
      </form>
    </div>;
}
