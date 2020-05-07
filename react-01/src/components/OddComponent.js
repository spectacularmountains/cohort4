import React, { Component } from 'react'

class OddComponent extends Component {
    render() {
        return (
            <div style={{display: (this.props.counter)%2 ? 'block' : 'none'}}>
                This is the ODD component!
            </div>
        )
    }
}

export default OddComponent
