// Reddit subs data fetcher

import request from 'request';
import redditModel from '../models/Reddit';
//const snoowrap = require('snoowrap');

const redditSubs = {
    getSubs: () => {
        const location = 'Worldwide';
        request({url: 'https://www.reddit.com/api/trending_subreddits.json', json: true}, (error, response, body) => {
            if (error || response.statusCode !== 200) {
                console.log(`An unexpected error occured while requesting Reddit Subs.`);
            }
            else {
                if (body) {
                    console.log(`[trends server] Updating all database entries for Reddit Subs (${location})`);
                    /*const r = new snoowrap({
                        userAgent: 'put your user-agent string here',
                        clientId: 'put your client id here',
                        clientSecret: 'put your client secret here',
                        refreshToken: 'put your refresh token here'
                    });*/
                    redditModel.deleteMany((error) => {
                        if (error) return console.error(error);
                    });
                    body.subreddit_names.forEach((sub) => {
                        request({url: `https://www.reddit.com/r/${sub}/.json`, json: true}, (error, response, body) => {
                            if (error || response.statusCode !== 200) {
                                console.log(`An unexpected error occured while requesting Reddit Sub details (${sub}).`);
                            }
                            else {
                                if (body) {
                                    const threadLen = body.data.children.length;
                                    let subscribers = 0;
                                    for (let i = 0; i < threadLen; i++) {
                                        const thread = body.data.children[i];
                                        if (thread.data.subreddit === sub) {
                                            subscribers = thread.data.subreddit_subscribers;
                                            break;
                                        }
                                    }
                                    redditSubs.insertSubs(location, sub, subscribers);
                                }
                            }
                        });
                    });
                }
            }
        });
    },
    insertSubs: (location, sub, subscribers) => {
        const dbData = new redditModel({
            name: sub,
            location: location,
            url: `https://reddit.com/r/${sub}`,
            subscribers: subscribers
        });
        dbData.save((error, dbData) => {
            if (error) return console.error(error);
        });
    }
};

export default redditSubs;