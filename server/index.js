// Server - running on Node.js

import 'dotenv/config';
import mongoose from 'mongoose';
import routes from './routes/router';
import googleTrends from './data/google';
import redditSubs from './data/reddit';
import youtubeVideos from './data/youtube';

routes.init();

mongoose.connect('mongodb://localhost/trends', { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, '[trends server] MongoDB error:'));
db.once('open', () => {
    console.log('[trends server] Successfully connected to MongoDB!');
    redditSubs.getSubs();
    googleTrends.getTrends();
    youtubeVideos.getVideos();
});