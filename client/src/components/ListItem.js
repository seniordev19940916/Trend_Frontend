import React from 'react';
//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
//import {faGoogle, faTwitter, faYoutube, faReddit} from '@fortawesome/free-brands-svg-icons';
import './ListItem.css';

const ListItem = ({platform, item}) => {
    const getItem = (platform) => {
        if (platform === 'google_trends') {
            return (
                <div className="ListItem google">
                    <img src={item.image} alt="Thumbnail" />
                    <div className="metric">{item.traffic.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</div>
                    <div>{item.name}</div>
                </div>
            )
        }
        else if (platform === 'reddit_subs') {
            return (
                <div className="ListItem reddit">
                    <div>{item.name}</div>
                </div>
            )
        }
        else if (platform === 'twitter_subjects') {
            return (
                <div className="ListItem twitter">
                    <img src={item.image} alt="Thumbnail" />
                    <div>{item.name}</div>
                </div>
            )
        }
        else if (platform === 'youtube_videos') {
            return (
                <div className="ListItem youtube">
                    <img src={item.image} alt="Thumbnail" />
                    <div>{item.name}</div>
                </div>
            )
        }
    }
                            
    return getItem(platform);
}

export default ListItem;