import React from 'react';
import './List.css';

const List = ({listData}) => {
    const renderList = () => {
        if (listData) {
            return listData.map(item => <div key={item._id}>{item.traffic.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}: {item.name}</div>);
        }
    }
    return (
        <div className="List">
            {renderList()}
        </div>
    );
}

export default List;