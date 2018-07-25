import React, { Component } from 'react';
import logo from './../logo.svg';
import './../css/App.css';
import HomePage from './components/HomePage';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = null;    
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">User Management Application</h1>
        </header>
        <HomePage />        
      </div>
    );
  }
}

export default App;