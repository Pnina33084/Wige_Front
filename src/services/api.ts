import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7169/api'
});

export default api;