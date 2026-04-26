// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const authAPI = {
  signup: (data) => axios.post(`${API_URL}/signup`, data),
  login:  (data) => axios.post(`${API_URL}/login`, data)
};

export const sosAPI = {
  sendSOS: (data) => axios.post(`${API_URL}/sos`, data)
};
