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
            data: []
        };
        this.editFilter = this.editFilter.bind(this);
    }
    
    componentWillMount() {
        
        this.getData({...this.state});
    }
    
    getData(newState) {
        const endpoint = `/${this.state.platform}/${this.state.location}`;
        api.getData(endpoint).then(result => {
            newState.data = result.data;
            this.setState(newState);
            console.log(this.state);
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
                    <Dropdown label="location" defaultVal={this.state.location} options={['Australia', 'Brazil', 'Canada', 'Germany']} onChange={this.editFilter} />
                </div>
                <List data={this.state} />
            </div>
        );
    }
}