/*
$url = 'https://www.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&chart=mostpopular&maxResults=50&key=' . $config["api_data"]["google"]["api_key"] . $nextPage;
    if ($locationId) {
$url .= '&regionCode=' . $locationId;
    }
*/
import 'dotenv/config';
//const {google} = require('googleapis');
import request from 'request';
import locations from '../config/locations';

//const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&chart=mostpopular&maxResults=50&key=${process.env.PORT}`;

const redditThreads = {
    getThreads: () => {
        request({url: 'https://www.reddit.com/api/trending_subreddits.json', json: true}, (error, response, body) => {
            if (error || response.statusCode !== 200) {
                console.log(`An unexpected error occured while posting data for ${location}.`);
            }
            else {
                if (body) {
                    console.log(body);
                }
            }
        });
    }
}

export default redditThreads;