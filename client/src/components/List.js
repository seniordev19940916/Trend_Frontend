import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGoogle, faTwitter, faYoutube, faReddit} from '@fortawesome/free-brands-svg-icons';
import ListItem from './ListItem';
import './List.css';

const List = ({data, platform, location}) => {
    const icons = {
        google_trends: faGoogle,
        reddit_subs: faReddit,
        twitter_subjects: faTwitter,
        youtube_videos: faYoutube,
    }
                            
    return (
        <div className="List">
            <div>
                <img src={require(`../img/flags/${location}.png`)} alt={location} />
                <FontAwesomeIcon className="fa-icon" icon={icons[platform]} />
                {platform.replace("_", " ")}
            </div>
            <div className="list-items-wrapper">
                {data.map(item => <ListItem key={item._id} platform={platform} item={item}/>)}
            </div>
        </div>
    );
}

export default List;