// Server - running on Node.js

import express from 'express';
import locations from '../config/locations';
import googleModel from '../models/Google';
import redditModel from '../models/Reddit';
import youtubeModel from '../models/Youtube';

const app = express();
const router = express.Router();
const port = process.env.PORT || 3001;

const routes = {
    init: () => {
        console.log(`[trends server] Initializing server...`);
        router.all('/*', function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            next();
        });
        router.get('/', (req, res) => {
            res.json({ success: false, error: 'No endpoint provided!' });
        });
        router.get('/locations', (req, res) => {
            res.json({ success: true, data: locations });
        });
        routes.createEndpoints('google_trends', googleModel, locations.filter(location => location.location !== 'Worldwide').map(location => location.location));
        routes.createEndpoints('reddit_subs', redditModel, ['Worldwide']);
        routes.createEndpoints('youtube_videos', youtubeModel, locations.map(location => location.location));
    },
    createEndpoints: (endpoint, model, platformLocations) => {
        router.get(`/${endpoint}`, (req, res) => {
            res.json({ success: false, error: 'No location provided!' });
        });
        platformLocations.forEach(location => {
            console.log(`[trends server] Routing a new enpoint to 'api/${endpoint}/${location}'...`);
            router.get(`/${endpoint}/${location}`, (req, res) => {
                model.find({location: location}, (error, model) => {
                    if (error) return res.json({ success: false, error: error });
                    return res.json({ success: true, data: model });
                });
            });
        });
    }
}

app.use('/api', router);
app.listen(port, () => console.log(`[trends server] Server is running and listening to port ${port}...`));

export default routes;
