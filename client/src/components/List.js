import React from 'react';
import ListItem from './ListItem';
import './List.css';

const List = ({data, platform, location}) => {
    const metrics = {
        google_trends: 'searches',
        reddit_subs: 'subscribers',
        youtube_videos: 'views',
    }
    
    const platformMetric = metrics[platform];
    
    data.sort((a, b) => (a[platformMetric] < b[platformMetric]) ? 1 : -1);
                            
    return (
        <div className="List">
            <div className="metric">{platformMetric}</div>
            <div className="wrapper">
                {data.map(item => <ListItem key={item._id} platform={platform} item={item}/>)}
            </div>
        </div>
    );
}

export default List;