import React, { Component } from 'react'; 
import MountainIcon from './MountainIcon'

class IconList extends Component {
    render() {
        return (
            <div>
                <MountainIcon className="App-logo" fill="#ddd" width="150" stroke="#def"/>
                <MountainIcon className="App-logo" fill="#ddd" width="150" stroke="#def"/>
                <MountainIcon className="App-logo" fill="#ddd" width="150" stroke="#def"/>
            </div>
        )
    }
}

export default IconList
