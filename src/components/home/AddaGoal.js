import React from 'react';
import DateTime from 'react-datetime';
import './DateTime.css';

export class AddaGoalForm extends React.Component {
  state = {
    showForm: false
  }
  render() {
    const showAdd = () => {
      let toggle = !this.state.showForm;
      console.log('TOGGLE!!!', this.setState({showForm: toggle}));
    };
    return <div>
        <button className={this.state.showForm ? 'hidden' : 'add-box'} onClick={e => {
            showAdd();
          }}>
          Add A Goal
        </button>
        <form className={this.state.showForm ? 'add-box' : 'hidden'} onSubmit={e => {
            e.preventDefault();
            this.props.addGoal(e);
            this.setState({ showForm: !this.state.showForm });
          }}>
          <h3>Add A Goal</h3>
          <DateTime required value={this.value} inputProps={{ name: 'dueDate', placeholder: 'SET DUE DATE', disabled: false }} />
          <textarea className="form-control" name="newGoal" placeholder="Write your SMART Goal Here!" value={this.value} />
          <div className="card-footer-buttons">
            <input className="create" type="submit" value="CREATE" />
            <button className="cancel" onClick={e => {
                e.preventDefault();
                this.setState({ showForm: !this.state.showForm });
              }}>
              ✖
            </button>
          </div>
        </form>
      </div>;
  }
}
