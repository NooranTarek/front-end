

import axios from 'axios';

const API_URL = 'http://localhost:5000/news';

export const getNews = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/all`, {
        headers: {
          token: `${token}`, 
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

