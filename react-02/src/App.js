import React, {Component} from 'react';
import './App.css';
import IconList from './components/IconList';
import CurrentApp from './components/CurrentApp'
import { ThemeContext } from './contexts/ThemeContext';

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
  
  static contextType = ThemeContext; 

  render () {
    const { isLightTheme, light, dark } = this.context; 
    const theme = isLightTheme ? dark : light;

    return (
        <div className="App">
          <header className="App-header">
            <span>{this.state.textOutput}</span>
            <DarkLightSwitch />
          </header>
          <div>
            <IconList changeTextOutput={this.changeTextOutput} changeCurrentApp={this.changeCurrentApp} currentApp={this.state.currentApp}/>
          </div>
          <div className={`App-body Style-${this.state.currentApp}`} style={{background: theme.ui, color: theme.text}}>
              <CurrentApp currentApp={this.state.currentApp}/>
          </div>
          <div className="App-footer">
            <span>Created by Cornelius Rott, EvolveU Full Stack Developer Program</span>
          </div>
        </div>
    );
  }
}

class DarkLightSwitch extends Component {
  
  static contextType = ThemeContext; 

  render() {
    const { toggleTheme } = this.context; 

    return (
        <div className="onoffswitch">
          <input onClick={()=> toggleTheme()} type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id="myonoffswitch" tabIndex="0" />
          <label className="onoffswitch-label" for="myonoffswitch">
              <span className="onoffswitch-inner"></span>
              <span className="onoffswitch-switch"></span>
          </label>
        </div>
    )
  }
}

export default App;

/* <p style={{color:"#000", fontSize:"20px", fontWeight: "bold"}}>{this.state.textOutput}</p> */
