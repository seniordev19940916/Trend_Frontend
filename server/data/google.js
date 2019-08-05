// Google Trends data fetcher

import googleApi from 'google-trends-api';
import locations from '../config/locations';
import googleModel from '../models/Google';

const googleTrends = {
    getTrends: () => {
        locations.forEach(location => {
            googleApi.dailyTrends({geo: location.iso}, (error, results) => {
                if (error) {
                    console.log(`[trends server] An unexpected error occured while running a query to fetch data for Google Trends (${location.location}:\n${error}).`);
                }
                else {
                    console.log(`[trends server] Updating all database entries for Google Trends (${location.location})...`);
                    googleModel.deleteMany({ location: location.location}, (error) => {
                        if (error) return console.error(error);
                    });
                    const data = JSON.parse(results);
                    const days = data.default.trendingSearchesDays;
                    days.forEach((trendDay, d) => {
                        const dayTrends = trendDay.trendingSearches;
                        dayTrends.forEach(trend => {
                            const dailyData = {
                                name: trend.title.query,
                                location: location.location,
                                traffic: parseInt(trend.formattedTraffic) * 1000,
                                url: `https://www.google.com/search?q=${encodeURIComponent(trend.title.query)}`,
                                image: trend.image.imageUrl,
                                date: trendDay.date.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')
                            }; 
                            const dbData = new googleModel(dailyData);
                            dbData.save((error, dbData) => {
                                if (error) return console.error(error);
                            });
                        });
                    });
                }
            });
        });
    },
    insertTrends: () => {
    
    }
};

export default googleTrends;