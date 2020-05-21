import React from 'react'
import MountainIcon from './MountainIcon'
import Greeting from './Greeting'
import TicTacToe from '../tictactoe/TicTacToe'

function CurrentApp(props) {
    if (props.currentApp === 1) {
        return <React.Fragment>
                    <MountainIcon className="App-logo" fill="#ddd" width="300" stroke="#def"/> 
                    <Greeting />            
                </React.Fragment>
    } else if (props.currentApp === 2) {
        return <TicTacToe />
    } 
    return <h3>Second App</h3>
}

export default CurrentApp;