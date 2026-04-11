import axios from 'axios';

// Injected at build time via REACT_APP_API_URL env var (see Dockerfile / .env)
const apiURL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/';

const apiServicelogin = axios.create({
    baseURL: apiURL
});

export default apiServicelogin;