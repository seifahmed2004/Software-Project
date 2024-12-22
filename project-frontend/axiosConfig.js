import axios from 'axios';
import { getCookie } from './src/utils/csrf'; // Import the getCookie function

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000', // Replace with your Django backend URL
  headers: {
    'Content-Type': 'application/json',
    'X-CSRFToken': getCookie('csrftoken'), // Add the CSRF token
  },
});

export default axiosInstance;
