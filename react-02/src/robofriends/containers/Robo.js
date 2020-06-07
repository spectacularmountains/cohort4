import React, { Component } from 'react'; 
import CardList from '../components/CardList'; 
import SearchBox from '../components/SearchBox'; 
import Scroll from '../components/Scroll'; 
import 'tachyons'; 

class Robo extends Component {
    constructor() {
        super()
        this.state = {
            robots: [], 
            searchfield: "", 
        }
    } 

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(users => {this.setState({ robots: users})});
    }

    onSearchChange = (e) => {
        this.setState({ searchfield: e.target.value })
    }

    render() {
        const filteredRobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
        })
        if (!this.state.robots.length) {
            return <h1 className="robo">loading...</h1>
        } else {
        return (
            <div className="tc">
                <h1 className="f-headline lh-solid robo">RoboFriends</h1>
                <SearchBox searchChange={this.onSearchChange}/>
                <Scroll>
                    <CardList robots={filteredRobots}/>
                </Scroll>
            </div>
                )            
        }
        
    }
}

export default Robo; 