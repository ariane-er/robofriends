import React, {Component} from "react";
import { connect } from 'react-redux';
import CardList from "../components/CardList";
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/ErrorBoundary"
import SearchBox from "../components/SearchBox"
import "./App.css";
import { setSearchField, requestRobots } from '../actions';

const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
}

class App extends Component {


    componentDidMount() {
        this.props.onRequestRobots();
    }


    render () {    

        const { searchField, onSearchChange, robots, isPending } = this.props;

        const filteredRobots = robots.filter(robots => {
            return robots.name.toLowerCase().includes(searchField.toLowerCase());
        });

        
        
        if (isPending) {
            return <h1>Loading</h1>;
        } else {

        return(
            <div className="tc">
                <h1 className="f1">Robofriend</h1>
                {/* For example, we passed onSearchChange as PROPS, but it's actually a method. */}
                <SearchBox searchChange={onSearchChange}/>
                <Scroll>
                <ErrorBoundary>
                <CardList robots = {filteredRobots}/>
                </ErrorBoundary>
                </Scroll>
            </div>            
        )}}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);