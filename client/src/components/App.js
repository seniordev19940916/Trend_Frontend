import React from 'react';
import api from '../api/data';
import Dropdown from './Dropdown';
import List from './List';
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
                console.log(newState);
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
                <h1>Trends</h1>
                <div className="filter-wrapper">
                    <Dropdown label="platform" value={this.state.platform} options={['Google Trends', 'Reddit Subs', 'YouTube Videos']} onChange={this.editFilter} />
                    <Dropdown label="location" value={this.state.location} options={this.state.locations} onChange={this.editFilter} />
                </div>
                <List data={this.state.data} platform={this.state.platform} location={this.state.location} />
            </div>
        );
    }
}