import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGoogle, faYoutube, faRedditAlien} from '@fortawesome/free-brands-svg-icons';
import ListItem from './ListItem';
import './List.css';

const List = ({data, platform, location}) => {
    const icons = {
        google_trends: faGoogle,
        reddit_subs: faRedditAlien,
        youtube_videos: faYoutube,
    }
    
    const metrics = {
        google_trends: 'searches',
        reddit_subs: 'subscribers',
        youtube_videos: 'views',
    }
                            
    return (
        <div className="List">
            <div className="list-description">
                <img src={require(`../img/flags/${location}.png`)} alt={location} />
                <FontAwesomeIcon className={`fa-icon ${platform}`} icon={icons[platform]} />
                <div className="platform">{platform.replace("_", " ")}</div>
                <div className="metric">{metrics[platform]}</div>
            </div>
            <div className="metric">{metrics[platform]}</div>
            <div className="list-items-wrapper">
                {data.map(item => <ListItem key={item._id} platform={platform} item={item}/>)}
            </div>
        </div>
    );
}

export default List;