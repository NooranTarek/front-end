import axios from 'axios';

const API_URL = 'http://localhost:5000/sources';

export const subscribeToSource = async ({ userId, sourceId }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/subscribe`,
        { userId, sourceId },
        {
          headers: {
            token: `${token}`, 
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const unsubscribeFromSource = async ({ userId, sourceId }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/unsubscribe`,
        { userId, sourceId },
        {
          headers: {
            token: `${token}`, 
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  export const getAllSources = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/all`, {
        headers: {
          token: `${token}`, 
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const getAllPopularSources = async () => {
    try {
      const response = await axios.get(`${API_URL}/popular`, {
      });
      console.log(response.data);
      return response;
    } catch (error) {
      throw error;
    }
  };