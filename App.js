import React,{ Component } from 'react';
import CardList from './CardList';
//import { robots } from './robots';
import SearchBox from './SearchBox';
import Scroll from './Scroll';
import './App.css';


class App extends Component {

    constructor() {
        super();
        this.state = {
            robots : [],
            searchfeild : ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users').then(response => {
            return response.json();
        })
        .then(users => {
            this.setState({robots: users})
        })
    }

    onSearchChange = (event) => {
        this.setState({ searchfeild: event.target.value })
        
        //console.log(event.target.value);
    }

    render() {
        const filteredRobots = this.state.robots.filter(robots => {
            return robots.name.toLowerCase().includes(this.state.searchfeild.toLowerCase())
        })

        if(this.state.robots.lenght === 0){
            return <h1>Loading</h1>
        }
        else{
            return (
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        <CardList robots = {filteredRobots} />
                    </Scroll>
                </div>
            );
        }
    }
}

export default App;