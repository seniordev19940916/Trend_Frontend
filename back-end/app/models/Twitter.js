// Mongoose model for Twitter Trends

import mongoose from 'mongoose';

const twitterSchema = new mongoose.Schema({
    name: String,
    location: String,
    url: String,
    tweets: Number
}, {timestamps: true});

export default mongoose.model('twitter_trends', twitterSchema);