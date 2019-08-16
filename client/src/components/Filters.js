import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGoogle, faYoutube, faRedditAlien} from '@fortawesome/free-brands-svg-icons';
import Dropdown from './Dropdown';
import './Filters.css';

const Filters = ({platform, location, locations, editFilter}) => { 
    const platformData = {
        google_trends: {
            icon: faGoogle,
            desc: 'The data below displays the top 20 search terms that jumped significantly in traffic over the past 24 hours.'
        },
        reddit_subs: {
            icon: faRedditAlien,
            desc: 'The data below displays the top 5 subreddits that have gained in popularity over the past 24 hours.'
        },
        youtube_videos: {
            icon: faYoutube,
            desc: 'The data below displays YouTube videos that recently have gained in popularity.'
        }
    }
                            
    return (
        <div className="Filters">
            <div>
                <FontAwesomeIcon className={`fa-icon ${platform}`} icon={platformData[platform].icon} size="lg" />
                <Dropdown label="platform" value={platform} options={['Google Trends', 'Reddit Subs', 'YouTube Videos']} onChange={editFilter} />
                <Dropdown label="location" value={location} options={locations} onChange={editFilter} />
                <img src={require(`../img/flags/${location}.png`)} alt={location} />
            </div>
            <p>{platformData[platform].desc}</p>
        </div>
    );
}

export default Filters;