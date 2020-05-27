import React from 'react'
import MountainIcon from './MountainIcon'
import Greeting from './Greeting'
import TicTacToe from '../tictactoe/TicTacToe'
import ImageSlider from './ImageSlider'

function CurrentApp(props) {
    if (props.currentApp === 1) {
        return <React.Fragment>
                    <MountainIcon className="App-logo" fill="000" width="350" stroke="#def"/> 
                    <Greeting />            
                </React.Fragment>
    } else if (props.currentApp === 2) {
        return <TicTacToe />
    } 
    return <ImageSlider />
}

export default CurrentApp;
