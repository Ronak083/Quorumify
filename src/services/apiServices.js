import axios from 'axios';
import authHeader from './authHeader';

const apiURL = 'http://localhost:8080/api/';

const apiService = axios.create({
    baseURL: apiURL,
    headers: authHeader()
})

export default apiService;