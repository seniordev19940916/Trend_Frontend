import React from 'react';
import api from '../api/data';
import Dropdown from './Dropdown';
import List from './List';
import './App.css';
require('dotenv').config({ path: '../../../.env' });

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
        this.getLocations();
    }
    
    getLocations() {
        api.getData('locations').then(result => {
            if (result.success) {
                const newState = {...this.state};
                newState.locations = result.data.map(a => a.location);
                this.getData(newState);
            }
        });
    }
    
    getData(newState) {
        const endpoint = `${newState.platform}/${newState.location}`
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
        this.getData(newState);
    }
    
    render() {
        return (
            <div className="App">
                <h1>Trends</h1>
                <div className="filter-wrapper">
                    <Dropdown label="platform" defaultVal={this.state.platform} options={['Google Trends', 'Twitter Subjects', 'YouTube Videos']} onChange={this.editFilter} />
                    <Dropdown label="location" defaultVal={this.state.location} options={this.state.locations} onChange={this.editFilter} />
                </div>
                <div>
                    <img src={require(`../img/flags/${this.state.location}.png`)} alt={this.state.location} />
                </div>
                <List listData={this.state.data} />
            </div>
        );
    }
}