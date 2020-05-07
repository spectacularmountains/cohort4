import React, { Component } from 'react'

class EvenComponent extends Component {
    render() {
        return (
            <div style={{display: (this.props.counter)%2 ? 'none' : 'block'}}>
                This is the EVEN component!
            </div>
        )
    }
}

export default EvenComponent
