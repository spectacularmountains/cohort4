import React, { Component } from 'react';
import MyComponent from './components/MyComponent'
import EvenComponent from './components/EvenComponent'
import OddComponent from './components/OddComponent'
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.counter = 1;
    this.state = {
      myState: "TBD",
    }
  };

  onPushMe = () => {
    this.setState({
      myState: this.counter++
    });
    console.log(this.counter);
  };

  render() {
    return (
      <React.Fragment>
        <MyComponent whatToSay={"Whatever"} />
        
        <EvenComponent counter={this.counter} />
        <OddComponent counter={this.counter} />
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>I am in control of this application and my name is Cornelius {this.counter}</h1>
          <button onClick={this.onPushMe}>
              Push Me
            </button>

          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
      </React.Fragment>
      
    )
  };
}

export default App;
