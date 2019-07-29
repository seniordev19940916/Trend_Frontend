// Server - running on Node.js

import express from 'express';
//import bodyParser from 'body-parser';
import google from '../models/Google';

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
        //app.use(bodyParser.urlencoded({ extended: true }));
        //app.use(bodyParser.json());
        router.get('/', (req, res) => {
            res.json({ success: false, message: 'No endpoint provided!' });
            console.log('[trends server] Received a client request without any endpoint.');
        });
        routes.createEndpoint('google', google);
        app.use('/api', router);
        app.listen(port, () => console.log(`[trends server] Server is running and listening to port ${port}...`));
    },
    createEndpoint: (endpoint, model) => {
        router.get(`/${endpoint}`, (req, res) => {
            model.find((error, model) => {
                if (error) return res.json({ success: false, error: error });
                return res.json({ success: true, data: model });
            });
            console.log(`[trends server] Received a client request to the endpoint '${endpoint}'.`);
        });
    }
}

export default routes;
