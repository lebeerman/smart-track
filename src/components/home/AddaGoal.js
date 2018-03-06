import React from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';

export default withAuth(AddaGoalForm = ({ addGoal }) => {

  let input;

  return(
    <div className="add-box">
      <form
        onSubmit={e => {
            e.preventDefault();
            addGoal(input.value);
            input.value = '';
          }}
        >
      <input
        className="form-control col-md-12"
        ref={node => {
          input = node;
        }}
      />
      <br />
      </form>
    </div>
  )
});




  render() {
    // Render JSX
    return (
      <div>
        <Title todoCount={this.state.data.length} />
        <TodoList todos={this.state.data} remove={this.handleRemove.bind(this)} />
      </div>
    );
  }
}
ReactDOM.render(<TodoApp />, document.getElementById('container'));