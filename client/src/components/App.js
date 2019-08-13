import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import api from '../api/data';
import List from './List';
import Filters from './Filters';
import './App.css';

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            location: 'australia',
            platform: 'google_trends',
            locations: [],
            data: []
        };
        this.editFilter = this.editFilter.bind(this);
        this.getLocations = this.getLocations.bind(this);
    }
    
    componentDidMount() {
        this.getLocations({...this.state});
    }
    
    getLocations(newState) {
        if (newState.platform === 'reddit_subs') {
            newState.location = 'worldwide';
            newState.locations = ['Worldwide'];
            this.getData(newState);
            return;
        }
        else if (newState.platform === 'google_trends') {
            newState.location = newState.location === 'worldwide' ? 'australia' : newState.location;
        }
        api.getData('locations').then(result => {
            if (result.success) {
                newState.locations = result.data.map(a => a.location);
                newState.locations = newState.platform === 'google_trends' ? newState.locations.filter(location => location !== 'Worldwide') : newState.locations;
                this.getData(newState);
            }
        });
    }
    
    getData(newState) {
        const endpoint = `${newState.platform}/${newState.location}`;
        api.getData(endpoint).then(result => {
            if (result.success) {
                newState.data = result.data;
                this.setState(newState);
            }
        });
    }
    
    editFilter(filter, val) {
        const newState = {...this.state};
        newState[filter] = val;
        this.getLocations(newState);
    }
    
    render() {
        return (
            <div className="App">
                <h2>Web Trends</h2>
                <Filters platform={this.state.platform} location={this.state.location} locations={this.state.locations} editFilter={this.editFilter} />
                {this.state.data.length ? <List data={this.state.data} platform={this.state.platform} location={this.state.location} /> : <FontAwesomeIcon icon={faSpinner} size="3x" spin={true} color="#fff" />}
            </div>
        );
    }
}