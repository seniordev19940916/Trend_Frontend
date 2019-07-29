import request from 'request';
const axios = require('axios');

const api = {
    getData: () => {
        const url = `http://localhost:3002/api/google`;
        /*return request({url: url, json: true}, (error, response, body) => {
            
            if (error || response.statusCode !== 200) {
                console.log(`An unexpected error occured requesting ${url}.`);
            }
            else {
                if (body) {
                    return;
                }
            }
        });*/
        const apa = axios.get(url)
          .then(function (response) {
                return response;
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .finally(function () {
            // always executed
        });
        return apa;
    }
};

export default api;