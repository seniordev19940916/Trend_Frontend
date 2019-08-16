import React from 'react';
import ListItem from './ListItem';
import './List.css';

const List = ({data, platform, location}) => {
    const metrics = {
        google_trends: ['searches'],
        reddit_subs: ['subscribers'],
        twitter_trends: ['tweets'],
        youtube_videos: ['views', 'likes'],
    }
    
    const platformMetric = metrics[platform][0];
    
    data.sort((a, b) => a[platformMetric] < b[platformMetric] ? 1 : -1);
                            
    return (
        <div className="List">
            {metrics[platform].map((item, i) => <div key={i} className="metric">{item}</div>)}
            <div className="wrapper">
                {data.map(item => <ListItem key={item._id} platform={platform} item={item}/>)}
            </div>
        </div>
    );
}

export default List;