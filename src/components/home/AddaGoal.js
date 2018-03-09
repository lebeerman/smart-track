import React from 'react';
import DateTime from 'react-datetime';
import './DateTime.css';

export const AddaGoalForm = ({ addGoal, handleDate }) => {
  let showForm = true;
  const showAdd = () => {
    showForm = !showForm;
    console.log('TOGGLE!!!', showForm);
  }
  return (
    <div className="add-box">
      <button className="register" onClick={(e)=>{showAdd()}}>Add A Goal</button>
      <form className={showForm ? "hidden" : "add-box"} onSubmit={e => {
          e.preventDefault();
          addGoal(e);
        }}>
        <h3>Add A Goal</h3>
        <DateTime value={this.value} inputProps={{ name: 'dueDate', placeholder: 'SET DUE DATE', disabled: false }} />
        <textarea className="form-control col-md-12" name="newGoal" placeholder="Write your SMART Goal Here!" value={this.value} />
        <input className="register" type="submit" value="CREATE" />
      </form>
      </div>);
}
