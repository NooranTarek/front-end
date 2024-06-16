import axios from 'axios';

const API_URL = 'http://localhost:5000/users';

export const userRegister = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const userLogin = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    console.log(response);
    const token = response.data.token;
    localStorage.setItem('token', token);
    return response.data;
  } catch (error) {
    throw error;
  }
};
  export const forgetPassword = async (email) => {
    try {
      const response = await axios.post(`${API_URL}/forget`, { email });
      console.log(response);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  export const resetPassword= async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/reset`, userData);
      console.log(response);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  