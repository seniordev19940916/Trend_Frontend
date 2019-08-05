/*
$url = 'https://www.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&chart=mostpopular&maxResults=50&key=' . $config["api_data"]["google"]["api_key"] . $nextPage;
    if ($locationId) {
$url .= '&regionCode=' . $locationId;
    }
*/
import 'dotenv/config';
import request from 'request';
import locations from '../config/locations';
import youtubeModel from '../models/Youtube';

const youtubeVideos = {
    getVideos: () => {
        locations.forEach(location => {
            const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&chart=mostpopular&maxResults=50&key=${process.env.GOOGLE_API_KEY}&regionCode=${location.iso}`;
            request({url: url, json: true}, (error, response, body) => {
                if (error || response.statusCode !== 200) {
                    console.log(`An unexpected error occured while requesting YouTube Videos for ${location.location}.`);
                }
                else {
                    if (body) {
                        console.log(`[trends server] Updating all database entries for YouTube Videos (${location.location})...`);
                        youtubeModel.deleteMany({ location: location.location}, (error) => {
                            if (error) return console.error(error);
                        });
                        const nextPageToken = body.hasOwnProperty('nextPageToken') ? body.nextPageToken : false
                        body.items.forEach((video) => {
                            const dbData = new youtubeModel({
                                name: video.snippet.title,
                                location: location.location,
                                url: `https://www.youtube.com/watch?v=${video.id}`,
                                image: video.snippet.thumbnails.high.url,
                                views: video.statistics.hasOwnProperty('viewCount') ? video.statistics.viewCount : 0,
                                likes: video.statistics.hasOwnProperty('likeCount') ? video.statistics.likeCount : 0,
                                comments: video.statistics.hasOwnProperty('commentCount') ? video.statistics.commentCount : 0,
                                publisher: video.snippet.channelTitle,
                                published: video.snippet.publishedAt.substr(0, 8)
                            });
                            dbData.save((error, dbData) => {
                                if (error) return console.error(error);
                            });
                        });
                    }
                }
            });
        });
    }
}

export default youtubeVideos;