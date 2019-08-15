// Reddit subs data fetcher

import request from 'request';
import moment from 'moment';
import redditModel from '../models/Reddit';

const location = 'Worldwide';

const redditSubs = {
    location: 'Worldwide',
    getSubs: () => {
        redditModel.findOne({}, {}, { sort: { 'created_at' : -1 } }, (err, item) => {
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
                console.log(`[trends server] Database entries for Reddit Subs (${redditSubs.location}) are already up to date.`);
                request({url: 'https://www.reddit.com/api/trending_subreddits.json', json: true}, (error, response, body) => {
                    if (error || response.statusCode !== 200) {
                        console.log(`An unexpected error occured while requesting Reddit Subs.`);
                    }
                    else {
                        if (body) {
                            console.log(`[trends server] Updating all database entries for Reddit Subs (${redditSubs.location})`);
                            redditModel.deleteMany((error) => {
                                if (error) return console.error(error);
                                redditSubs.insertSubs(body);
                            });
                        }
                    }
                }); 
            }
            else {
                console.log(`[trends server] Database entries for Reddit Subs (${redditSubs.location}) are already up to date.`);
            }
        });
    },
    insertSubs: (body) => {
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
                        const dbData = new redditModel({
                            name: sub,
                            location: redditSubs.location,
                            url: `https://reddit.com/r/${sub}`,
                            subscribers: subscribers
                        });
                        dbData.save((error, dbData) => {
                            if (error) return console.error(error);
                        });
                    }
                }
            });
        });
    }
};

export default redditSubs;