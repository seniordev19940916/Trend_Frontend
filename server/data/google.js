// Google Trends data fetcher

import googleApi from 'google-trends-api';
import locations from '../config/locations';
import google from '../models/Google';

const googleTrends = {
    getTrends: () => {
        locations.forEach((location) => {
            googleApi.dailyTrends({geo: location.iso}, (error, results) => {
                if (error) {
                    console.log(`[trends server] An unexpected error occured while running a Google Trends (Daily) query for ${location.location}:\n${error}`);
                }
                else {
                    google.deleteMany({ location: location.location}, (error) => {
                        if (error) return console.error(error);
                        console.log(`[trends server] Successfully deleted all Google Trends entries for ${location.location} from the database!`);
                    });
                    const data = JSON.parse(results);
                    const days = data.default.trendingSearchesDays;
                    days.forEach((trendDay, d) => {
                        const dayTrends = trendDay.trendingSearches;
                        dayTrends.forEach((trend) => {
                            const dailyData = {
                                name: trend.title.query,
                                location: location.location,
                                traffic: parseInt(trend.formattedTraffic) * 1000,
                                image: trend.image.imageUrl,
                                date: trendDay.date
                            }; 
                            const dbData = new google(dailyData);
                            dbData.save((error, dbData) => {
                                if (error) return console.error(error);
                                console.log(`[trends server] Successfully saved an entry for 'Google Daily' to the database!`);
                            });
                        });
                    });
                }
            });
        });
    }
};

export default googleTrends;