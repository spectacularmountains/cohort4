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

  getCurrentAppStyle = () => {
    let currentApp = this.state.currentApp;
    if (currentApp === 1) {
      return "Home"
    } else if (currentApp === 2) {
      return "Tic-tac-toe"
    } else if (currentApp === 3) {
      return "Main-concepts"
    } else if (currentApp === 4) {
      return "Robo-friends"
    } 
  }

  render () {
    return (
        <div className="App">
          <header className="App-header">
            <p>{this.state.textOutput}</p>
          </header>
          <div>
            <IconList changeTextOutput={this.changeTextOutput} changeCurrentApp={this.changeCurrentApp} currentApp={this.state.currentApp}/>
          </div>
          <div className={`App-body Style-${this.state.currentApp}`}>
              <CurrentApp currentApp={this.state.currentApp}/>
          </div>
          <div className="App-footer">
            <p>Created by Cornelius Rott, EvolveU Full Stack Developer Program</p>
          </div>
        </div>
    );
  }
}

export default App;

/* <p style={{color:"#000", fontSize:"20px", fontWeight: "bold"}}>{this.state.textOutput}</p> */
