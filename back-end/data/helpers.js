// Helper functions for the data fetchers

const moment = require("moment");

const helpers = {
  updateCollection: (error, item) => {
    if (error || !item) {
      return true;
    }
    if (!moment(item.createdAt).isAfter(moment().subtract(1, "hours"))) {
      return true;
    }
    return false;
  },
};

module.exports = helpers;
