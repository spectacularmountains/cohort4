import React, { Component } from 'react'; 
import Icon from './Icon'

class IconList extends Component {

    state = {
        mountains: [
            {
                id: 1, 
                name: "Mount Oliver",
                highlighted: false
            },
            {
                id: 2, 
                name: "Mount Rundle",
                highlighted: false
            },
            {
                id: 3, 
                name: "Mount Chester",
                highlighted: false
            }
        ]
    }
    
    getStyle = (mtn) => {
        return {
            fill: mtn.highlighted ? '#000' : '#eee'
        }
    }

    handleClick = (mtn) => {
        this.props.changeTextOutput(mtn.name);
        this.setState({mountains: this.state.mountains.map((mountain) => {
            if (mountain.id === mtn.id) {
                mountain.highlighted = !mountain.highlighted; 
                return mountain;
            }
            mountain.highlighted = false;
            return mountain;
        })})
    }

    render() {

        // Loop to display 3 mountain icons 
        let list = this.state.mountains.map((mtn) => {
        return <div key={mtn.id} onClick={() => this.handleClick(mtn)} style={this.getStyle(mtn)}><Icon /></div>         
        });
        return <div style={iconListStyle}>{list}</div>
    }
}

const iconListStyle = {
    display: "flex",
    justifyContent: "center",
}

export default IconList
