// API requests to get data from the server

const axios = require("axios");

const api = {
  getData: (endpoint) => {
    const url = `http://52.64.37.147:3000/api/${endpoint}`; // Get port from environment variables
    return axios
      .get(url)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return { success: false, error: error };
      });
  },
};

export default api;
