import React from 'react';
import './Dropdown.css';

export default class Dropdown extends React.Component {
    render() {
        return (
            <div className="Dropdown">
                <label>{this.props.label}</label>
                <select onChange={(e) => this.props.onChange(this.props.label, e.target.value)} value={this.props.defaultVal}>
                    {this.props.options.map(option => <option value={option.replace(" ", "_").toLowerCase()} key={option}>{option}</option>)}
                </select>
            </div>
        );
    }
}