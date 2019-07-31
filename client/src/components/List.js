import React from 'react';
import './List.css';

export default class List extends React.Component {
    renderList() {
        //console.log(this.props.data);
        return this.props.data.data.map(item => <p key={item._id}>{item.name}</p>);
    }
    
    render() {
        return (
            <div className="List">
                {this.renderList()}
            </div>
        );
    }
}