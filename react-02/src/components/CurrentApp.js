import React, { Component } from 'react'
import MountainIcon from './MountainIcon'
import Greeting from './Greeting'
import TicTacToe from '../tictactoe/TicTacToe'
import ImageSlider from './ImageSlider'
import RoboFriends from '../robofriends/containers/Robo'
import Bank from '../bank/Controller'
import Cities from '../cities/Cities'
import LinkedList from '../linkedlist/linkedlist'


function CurrentApp(props) {
        if (props.currentApp === 1) {
            return <React.Fragment>
                        <MountainIcon className="App-logo" fill="000" width="350" stroke="#def"/> 
                        <Greeting />            
                    </React.Fragment>
        } else if (props.currentApp === 2) {
            return <TicTacToe />
        } else if (props.currentApp === 3) {
            return <ImageSlider />
        } else if (props.currentApp === 4) {
            return <RoboFriends />
        } else if (props.currentApp === 5) {
            return <Bank />
        } else if (props.currentApp === 6) {
            return <Cities />
        } else if (props.currentApp === 7) {
            return <LinkedList />
        } 
}

export default CurrentApp;
