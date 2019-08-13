import React from 'react';
//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
//import {faGoogle, faTwitter, faYoutube, faReddit} from '@fortawesome/free-brands-svg-icons';
import './ListItem.css';

const ListItem = ({platform, item}) => {
    console.log(item);
    const getItem = (platform) => {
        if (platform === 'google_trends') {
            return (
                <div className="ListItem google">
                    <img src={item.image ? item.image : require('../img/misc/not-found.jpg')} alt="Thumbnail" />
                    <div className="metric">{item.searches ? item.searches.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : '-'}+</div>
                    <div>{item.name}</div>
                    <div><a href={item.url} rel="noopener noreferrer" target="_blank">Visit URL</a></div>
                </div>
            )
        }
        else if (platform === 'reddit_subs') {
            return (
                <div className="ListItem reddit">
                    <div className="metric">{item.subscribers ? item.subscribers.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : '-'}</div>
                    <h4>{item.name}</h4>
                    <div><a href={item.url} rel="noopener noreferrer" target="_blank">reddit.com/r/{item.name}</a></div>
                </div>
            )
        }
        else if (platform === 'twitter_subjects') {
            return (
                <div className="ListItem twitter">
                    <img src={item.image ? item.image : require('../img/misc/not-found.jpg')} alt="Thumbnail" />
                    <div>{item.name}</div>
                </div>
            )
        }
        else if (platform === 'youtube_videos') {
            return (
                <div className="ListItem youtube">
                    <img src={item.image ? item.image : require('../img/misc/not-found.jpg')} alt="Thumbnail" />
                    <div className="metric">{item.views ? item.views.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : '-'}</div>
                    <div>{item.name}</div>
                </div>
            )
        }
    }
                            
    return getItem(platform);
}

export default ListItem;