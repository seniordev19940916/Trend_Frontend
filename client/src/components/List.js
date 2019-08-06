import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGoogle, faTwitter, faYoutube, faRedditAlien} from '@fortawesome/free-brands-svg-icons';
import ListItem from './ListItem';
import './List.css';

const List = ({data, platform, location}) => {
    const icons = {
        google_trends: faGoogle,
        reddit_subs: faRedditAlien,
        twitter_subjects: faTwitter,
        youtube_videos: faYoutube,
    }
                            
    return (
        <div className="List">
            <div className="list-description">
                <img src={require(`../img/flags/${location}.png`)} alt={location} />
                <FontAwesomeIcon className={`fa-icon ${platform}`} icon={icons[platform]} />
                <div className="platform">{platform.replace("_", " ")}</div>
            </div>
            <div className="list-items-wrapper">
                {data.map(item => <ListItem key={item._id} platform={platform} item={item}/>)}
            </div>
        </div>
    );
}

export default List;