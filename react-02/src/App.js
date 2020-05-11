import React, {Component} from 'react';
import MountainIcon from './components/MountainIcon';
import './App.css';
import IconList from './components/IconList';
import Greeting from './components/Greeting'

class App extends Component {
  state = {textOutput: "Welcome to the Three Mountains!"};

  changeTextOutput = (name) => {
    this.setState({textOutput: name})
  }

  render () {
    return (
        <div className="App">
          <p style={{color:"#000", fontSize:"20px", fontWeight: "bold"}}>{this.state.textOutput}</p>

          <IconList changeTextOutput={this.changeTextOutput}/>
          <header className="App-header">
            <MountainIcon className="App-logo" fill="#ddd" width="300" stroke="#def"/>
            <Greeting />
          </header>
        </div>
      );    
  }
  
}

export default App;
