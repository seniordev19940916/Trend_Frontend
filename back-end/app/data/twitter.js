import 'dotenv/config';
import request from 'request';
import twitter from 'twitter';
import locations from '../config/locations';
import helpers from '../data/helpers';
import twitterModel from '../models/Twitter';

const twitterTrends = {
    getTrends: () => {
        var client = new twitter({
          consumer_key: process.env.TWITTER_CONSUMER_KEY,
          consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
          access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
          access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
        });
        locations.forEach(location => {
            twitterModel.findOne({location: location.location}, {}, { sort: { 'created_at' : -1 } }, (err, item) => {
                if (helpers.updateCollection(err, item)) {
                    
                    client.get('trends/place', {id: location.woeid}, (error, tweets) => {
                        if (error) {
                            console.log(`An unexpected error occured while requesting Twitter Trends for ${location.location}.`);
                        }
                        else {
                            const data = tweets[0].trends;
                            console.log(`[trends server] Updating all database entries for Twitter Trends (${location.location})...`);
                            twitterModel.deleteMany({location: location.location}, (error) => {
                                if (error) return console.error(error);
                                data.forEach((trend) => {
                                    twitterTrends.insertTrends(location, trend);
                                });
                            });
                        }

                    });
                }
                else {
                    console.log(`[trends server] Database entries for Twitter Trends (${location.location}) are already up to date.`);
                }
            });
        });
    },
    insertTrends: (location, trend) => {
        const dbData = new twitterModel({
            name: trend.name,
            location: location.location,
            url: trend.url,
            tweets: trend.tweet_volume ? trend.tweet_volume : 10000,
        });
        dbData.save((error, dbData) => {
            if (error) return console.error(error);
        });
    }
}

export default twitterTrends;