import React from 'react';
import api from '../api/data';
import Dropdown from './Dropdown';
import './App.css';

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            location: 'australia',
            platform: 'google_trends',
            data: []
        };
    }
    
    componentWillMount() {
        const endpoint = `/${this.state.platform}/${this.state.location}`;
        api.getData(endpoint).then(result => {
            this.editState('data', result.data);
        });
    }
    
    /*renderZist = () => {
        let content = 'apa';
        if (this.state.data.length) {
            console.log(this.state.data);
            content = this.state.data[0].name;
        }
        return (
            <h1>{content}</h1>
        )
    };*/
    
    editState = (key, val) => {
        const newState = {...this.state};
        newState[key] = val;
        this.setState(newState);
    }
    
    editFilter = (filter, val) => {
        this.editState(filter, val);
        //
    }
    
    render() {
        return (
            <div className="App">
                <h1>Trends</h1>
                <div className="filter-wrapper">
                    <Dropdown label="platform" defaultVal={this.state.platform} options={['Google Trends', 'Twitter Subjects', 'YouTube Videos']} onChange={this.editFilter} />
                    <Dropdown label="location" defaultVal={this.state.location} options={['Australia', 'Brazil', 'Denmark']} onChange={this.editFilter} />
                </div>
                <div>
                    
                </div>
            </div>
        );
    }
}