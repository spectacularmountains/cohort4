import React, {Component} from 'react';
import './App.css';
import IconList from './components/IconList';
import CurrentApp from './components/CurrentApp'

class App extends Component {
  state = {
    textOutput: "Welcome to the Three Mountains!", 
    currentApp: 1,
  };

  changeTextOutput = (name) => {
    this.setState({textOutput: name})
  }

  changeCurrentApp = (id) => {
    this.setState({currentApp: id})
  }

  render () {
    return (
        <div className="App">
          <header className="App-header">
            <span>{this.state.textOutput}</span>
          </header>
          <div>
            <IconList changeTextOutput={this.changeTextOutput} changeCurrentApp={this.changeCurrentApp} currentApp={this.state.currentApp}/>
          </div>
          <div className={`App-body Style-${this.state.currentApp}`}>
              <CurrentApp currentApp={this.state.currentApp}/>
          </div>
          <div className="App-footer">
            <span>Created by Cornelius Rott, EvolveU Full Stack Developer Program</span>
          </div>
        </div>
    );
  }
}

export default App;

/* <p style={{color:"#000", fontSize:"20px", fontWeight: "bold"}}>{this.state.textOutput}</p> */
