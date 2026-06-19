import axios from 'axios';

const apiURL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/';

const apiService = axios.create({
    baseURL: apiURL,
    headers: {
        'Content-Type': 'application/json',
    }
});

apiService.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiService;
