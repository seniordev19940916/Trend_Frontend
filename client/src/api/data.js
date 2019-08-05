const axios = require('axios');

const api = {
    getData: (endpoint) => {
        const url = `http://localhost:3002/api/${endpoint}`;
        console.log(url);
        return axios.get(url).then(response => {
            return response.data
        }).catch(error => {
            return {success: false, error: error};
        });
    }
};

export default api;