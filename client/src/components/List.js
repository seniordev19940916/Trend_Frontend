import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGoogle, faTwitter, faYoutube, faReddit} from '@fortawesome/free-brands-svg-icons';
import './List.css';

const List = ({data, platform, location}) => {
    
    console.log(data);
    
    const getPlatformData = (platform) => {
        const platformData = {
            icon: '',
            data: []
        }
        switch (platform) {
            case 'google_trends':
                platformData.icon = faGoogle;
                platformData.list = data ? data.map(item => <div className="list-item list-item-google" key={item._id}><img className="list-image" src={item.image} alt="Thumbnail" />{item.traffic.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}: {item.name}</div>) : '';
                break; 
            case 'twitter_subjects':
                platformData.icon = faTwitter;
                break;
            case 'youtube_videos':
                platformData.icon = faYoutube;
                platformData.list = data ? data.map(item => <div className="list-item list-item-youtube" key={item._id}><img className="list-image" src={item.image} alt="Thumbnail" />{item.name}: {item.url}</div>) : '';
                break; 
            case 'reddit_subs':
                platformData.icon = faReddit;
                platformData.list = data ? data.map(item => <div className="list-item list-item-reddit" key={item._id}>{item.name}: {item.url}</div>) : '';
                break;                 
            default: 
                platformData.icon = faGoogle;
        }
        return platformData;
    }

    const platformData = getPlatformData(platform);
                            
    return (
        <div className="List">
            <div>
                <img src={require(`../img/flags/${location}.png`)} alt={location} />
                <FontAwesomeIcon className="fa-icon" icon={platformData.icon} />
                {platform.replace("_", " ")}
            </div>
            <div className="list-items-wrapper">
                {platformData.list}
            </div>
        </div>
    );
}

export default List;