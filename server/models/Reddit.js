// Mongoose model for Google Trends (Daily)

import mongoose from 'mongoose';

const redditSchema = new mongoose.Schema({
    name: String,
    url: String
}, {timestamps: true});

export default mongoose.model('reddit_subs', redditSchema);