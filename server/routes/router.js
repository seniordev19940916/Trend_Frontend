// Server - running on Node.js

import express from 'express';
import locations from '../config/locations';
import googleModel from '../models/Google';

const app = express();
const router = express.Router();
const port = process.env.PORT || 3001;

const routes = {
    init: () => {
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
        routes.createEndpoints('google_trends', googleModel, true);
        routes.createEndpoints('reddit_subs', googleModel);
    },
    createEndpoints: (endpoint, model, locationEndpoints = false) => {
        router.get(`/${endpoint}`, (req, res) => {
            model.find((error, model) => {
                if (error) return res.json({ success: false, error: error });
                return res.json({ success: true, data: model });
            });
        });
        if (locationEndpoints) {
            locations.forEach(location => {
                router.get(`/${endpoint}/${location.location}`, (req, res) => {
                    model.find({location: location.location}, (error, model) => {
                        if (error) return res.json({ success: false, error: error });
                        return res.json({ success: true, data: model });
                    });
                });
            });
        }
    }
}

app.use('/api', router);
app.listen(port, () => console.log(`[trends server] Server is running and listening to port ${port}...`));

export default routes;
