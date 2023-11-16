// Mongoose model for YouTube Videos

import mongoose from 'mongoose';

const youtubeSchema = new mongoose.Schema({
    name: String,
    location: String,
    url: String,
    image: String,
    views: Number,
    likes: Number,
    publisher: String,
    published: Date
}, {timestamps: true});

export default mongoose.model('youtube_videos', youtubeSchema);