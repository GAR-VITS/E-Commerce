import axios from 'axios';
const BASE_URL = 
  process.env.REACT_APP_API_URL || 
  import.meta.env?.VITE_API_URL || 
  'http://localhost:8000';

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, 
});

export default API;