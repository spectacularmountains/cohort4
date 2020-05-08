import React, {Component} from 'react';
import MountainIcon from './components/MountainIcon.js';
import './App.css';
import IconList from './components/IconList.js';

class App extends Component {
  state = {textOutput: "Welcome to the Three Mountains!"};

  handleClick = (index) => {
    console.log("from IconList", index);
    this.setState({textOutput: `You clicked on Mountain ${index}`})

}
  render () {
    return (
        <div className="App">
          <p style={{color:"#f50"}}>{this.state.textOutput}</p>

          <IconList handleClick={this.handleClick}/>
          <header className="App-header">
            <MountainIcon className="App-logo" fill="#ddd" width="300" stroke="#def"/>
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
      );    
  }
  
}

export default App;
