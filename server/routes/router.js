// Server - running on Node.js

import express from 'express';
import locations from '../config/locations';
import googleModel from '../models/Google';

const app = express();
const router = express.Router();
const port = process.env.PORT || 3001;

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
 });


const routes = {
    init: () => {
        router.get('/', (req, res) => {
            res.json({ success: false, error: 'No endpoint provided!' });
        });
        routes.createEndpoint('google_trends', googleModel);
        app.use('/api', router);
        app.listen(port, () => console.log(`[trends server] Server is running and listening to port ${port}...`));
    },
    createEndpoint: (endpoint, model) => {
        router.get(`/${endpoint}`, (req, res) => {
            model.find((error, model) => {
                if (error) return res.json({ success: false, error: error });
                return res.json({ success: true, data: model });
            });
        });
        locations.forEach((location) => {
            router.get(`/${endpoint}/${location.location}`, (req, res) => {
                model.find({location: location.location}, (error, model) => {
                    if (error) return res.json({ success: false, error: error });
                    return res.json({ success: true, data: model });
                });
            });
        });
    }
}

export default routes;
