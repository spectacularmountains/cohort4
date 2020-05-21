import React, {Component} from 'react';
import MountainIcon from './components/MountainIcon';
import './App.css';
import IconList from './components/IconList';
import Greeting from './components/Greeting';
import CurrentApp from './components/CurrentApp'

class App extends Component {
  state = {
    textOutput: "Welcome to the Three Mountains!", 
    currentApp: 1
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
          <p style={{color:"#000", fontSize:"20px", fontWeight: "bold"}}>{this.state.textOutput}</p>

          <IconList changeTextOutput={this.changeTextOutput} changeCurrentApp={this.changeCurrentApp} />
          <header className="App-header">
            <CurrentApp currentApp={this.state.currentApp} />
          </header>
        </div>
      );    
  }
  
}

export default App;
