import React, { Component } from 'react'; 
import Icon from './Icon'

class IconList extends Component {

    state = {
        mountains: [
            {
                id: 1, 
                name: "HOME",
                highlighted: false
            },
            {
                id: 2, 
                name: "Tic Tac Toe",
                highlighted: false
            },
            {
                id: 3, 
                name: "React Main Concepts",
                highlighted: false
            },
            {
                id: 4, 
                name: "RoboFriends",
                highlighted: false
            },
            {
                id: 5, 
                name: "Bank Account",
                highlighted: false
            },
            {
                id: 6, 
                name: "Cities and Communities",
                highlighted: false
            },
            {
                id: 7, 
                name: "Linked List",
                highlighted: false
            },
            {
                id: 8, 
                name: "Stacks & Queues",
                highlighted: false
            },
        ]
    }
    
    getStyle = (mtn) => {
        return {
            fill: mtn.highlighted ? '#000' : '#eee'
        }
    }

    handleMouseOver = (mtn) => {
        this.props.changeTextOutput(mtn.name);
        this.setState({mountains: this.state.mountains.map((mountain) => {
            if (mountain.id === mtn.id) {
                // Change "true" below to "!mountain.highlighted" in order to un-highlight icon
                mountain.highlighted = true; 
                return mountain;
            }
            mountain.highlighted = false; 
            return mountain;
        })})
    }

    handleMouseOut = () => {
        this.setState({mountains: this.state.mountains.map((mountain) => {
            if (mountain.id === this.props.currentApp) {
                // Change "true" below to "!mountain.highlighted" in order to un-highlight icon
                mountain.highlighted = true; 
                this.props.changeTextOutput(mountain.name);
                return mountain;
            }
            mountain.highlighted = false; 
            return mountain;
        })})
    }

    handleClick = (mtn) => {
        this.props.changeCurrentApp(mtn.id);
    }

    render() {

        // Loop to display mountain icons 
        let list = this.state.mountains.map((mtn) => {
        return <div key={mtn.id} onMouseOver={() => this.handleMouseOver(mtn)} onMouseOut={() => this.handleMouseOut()} onClick={() => this.handleClick(mtn)} style={this.getStyle(mtn)}><Icon /></div>         
        });
        return <div style={iconListStyle}>{list}</div>
    }
}

const iconListStyle = {
    display: "flex",
    justifyContent: "center",
    marginTop: "-40px",
    marginBottom: "-40px",
}

export default IconList
