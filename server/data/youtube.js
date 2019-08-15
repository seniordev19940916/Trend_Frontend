import 'dotenv/config';
import request from 'request';
import moment from 'moment'; 
import locations from '../config/locations';
import youtubeModel from '../models/Youtube';

const youtubeVideos = {
    getVideos: () => {
        locations.forEach(location => {
            youtubeModel.findOne({location: location.location}, {}, { sort: { 'created_at' : -1 } }, (err, item) => {
                let getData = false;
                if (err || !item) {
                    getData = true;
                }
                else {
                    if (!moment(item.createdAt).isAfter(moment().subtract(1, 'hours'))) {
                        getData = true;
                    }
                }
                if (getData) {
                    let url = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&chart=mostpopular&maxResults=50&order=viewCount&key=${process.env.GOOGLE_API_KEY}`;
                    url += location.iso ? `&regionCode=${location.iso}` : '';
                    request({url: url, json: true}, (error, response, body) => {
                        if (error || response.statusCode !== 200) {
                            console.log(`An unexpected error occured while requesting YouTube Videos for ${location.location}.`);
                        }
                        else {
                            if (body) {
                                console.log(`[trends server] Updating all database entries for YouTube Videos (${location.location})...`);
                                youtubeModel.deleteMany({location: location.location}, (error) => {
                                    if (error) return console.error(error);
                                    body.items.forEach((video) => {
                                        youtubeVideos.insertVideos(location, video);
                                    });
                                });
                            }
                        }
                    });
                }
                else {
                    console.log(`[trends server] Database entries for YouTube Videos (${location.location}) are already up to date.`);
                }
            });
        });
    },
    insertVideos: (location, video) => {
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
    }
}

export default youtubeVideos;