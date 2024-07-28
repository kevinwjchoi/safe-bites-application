
import axios from 'axios';

const API_KEY = process.env.REACT_APP_YELP_API_KEY;
const BASE_URL = 'https://api.yelp.com/v3';

export const fetchBusinesses = async (location) => {
  try {
    const response = await axios.get(`${BASE_URL}/businesses/search`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
      params: {
        location: location,
        term: 'restaurants',
        limit: 10,
      },
    });
    return response.data.businesses;
  } catch (error) {
    console.error('Error fetching businesses:', error);
    throw error;
  }
};
