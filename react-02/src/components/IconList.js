import React, { Component } from 'react'; 
import Icon from './Icon'

class IconList extends Component {


    render() {
        let data = [0,1,2];
        let list = data.map((obj, index) => {
        return <div key={index} id={"id-" + index} onClick={() => this.props.handleClick(index)}><Icon /></div>         
        });
        return (
                <div style={iconListStyle}>{list}</div>
        )
    }
}

const iconListStyle = {
    display: "flex",
    justifyContent: "center",
}

export default IconList
