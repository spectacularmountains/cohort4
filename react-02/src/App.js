import React from 'react';
import MountainIcon from './components/MountainIcon.js';
import './App.css';
import IconList from './components/IconList.js';

function App() {
  return (
    <div className="App">
      <IconList />
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

export default App;
