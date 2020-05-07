import React, { Component } from 'react'

class MyComponent extends Component {
    render() {
        return (
            <React.Fragment>
                <div>
                    Hello World from MyComp: {this.props.whatToSay}
                </div>
                <button>
                    MyComp button
                </button>
            </React.Fragment>
        )
    }
}

export default MyComponent
