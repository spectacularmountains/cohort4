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
            }
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

    handleClick = (mtn) => {
        this.props.changeCurrentApp(mtn.id);
    }

    render() {

        // Loop to display 3 mountain icons 
        let list = this.state.mountains.map((mtn) => {
        return <div key={mtn.id} onMouseOver={() => this.handleMouseOver(mtn)} onClick={() => this.handleClick(mtn)} style={this.getStyle(mtn)}><Icon /></div>         
        });
        return <div style={iconListStyle}>{list}</div>
    }
}

const iconListStyle = {
    display: "flex",
    justifyContent: "center",
}

export default IconList
