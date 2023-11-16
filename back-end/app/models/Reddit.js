// Mongoose model for Reddit Subs

import mongoose from 'mongoose';

const redditSchema = new mongoose.Schema({
    name: String,
    location: String,
    url: String,
    subscribers: Number
}, {timestamps: true});

export default mongoose.model('reddit_subs', redditSchema);