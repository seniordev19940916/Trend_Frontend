// Mongoose model for Google Trends (Daily)

import mongoose from 'mongoose';

const googleSchema = new mongoose.Schema({
    name: String,
    location: String,
    traffic: Number,
    image: String,
    date: String
}, {timestamps: true});

export default mongoose.model('google', googleSchema);