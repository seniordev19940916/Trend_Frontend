import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGoogle, faYoutube, faRedditAlien} from '@fortawesome/free-brands-svg-icons';
import Dropdown from './Dropdown';
import './Filters.css';

const Filters = ({platform, location, locations, editFilter}) => {
    const icons = {
        google_trends: faGoogle,
        reddit_subs: faRedditAlien,
        youtube_videos: faYoutube,
    }
                            
    return (
        <div className="Filters">
            <FontAwesomeIcon className={`fa-icon ${platform}`} icon={icons[platform]} size="lg" />
            <Dropdown label="platform" value={platform} options={['Google Trends', 'Reddit Subs', 'YouTube Videos']} onChange={editFilter} />
            <Dropdown label="location" value={location} options={locations} onChange={editFilter} />
            <img src={require(`../img/flags/${location}.png`)} alt={location} />
        </div>
    );
}

export default Filters;