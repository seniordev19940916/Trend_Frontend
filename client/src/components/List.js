import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGoogle, faTwitter, faYoutube, faReddit} from '@fortawesome/free-brands-svg-icons';
import './List.css';

const List = ({data, platform, location}) => {  
    const getFilterIcon = (platform) => {
        let icon;
        switch (platform) {
            case 'google_trends':
                icon = faGoogle;
                break; 
            case 'twitter_subjects':
                icon = faTwitter;
                break;
            case 'youtube_videos':
                icon = faYoutube;
                break; 
            case 'reddit_threads':
                icon = faReddit;
                break;                 
            default: 
                icon = faGoogle;
        }
        return icon;
    }
    
    const renderList = () => data ? data.map(item => <div key={item._id}>{item.traffic.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}: {item.name}</div>) : '';
                            
    return (
        <div className="List">
            <div>
                <img src={require(`../img/flags/${location}.png`)} alt={location} />
                <FontAwesomeIcon className="fa-icon" icon={getFilterIcon(location)} />
                {platform.replace("_", " ")}
            </div>
            {renderList()}
        </div>
    );
}

export default List;