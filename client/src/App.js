import React, { Component } from 'react';

import logo from './logo.svg';

import './App.css';

class App extends Component {
  state = {
    response: ''
  };

  componentDidMount() {
    fetch('api/hello')
      .then(res => res.json())
      .then(res => {
        console.log('Hi!', res);
        this.setState({ response: res.express });
      })
      .catch(err => console.log(err));
  }

   


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">{this.state.response}</p>
      </div>
    );
  }
}

export default App;
