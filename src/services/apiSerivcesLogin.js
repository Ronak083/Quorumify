import axios from 'axios';
const apiURL = 'http://localhost:8080/api/';

const apiServicelogin = axios.create({
    baseURL: apiURL
})

export default apiServicelogin;