import axios from 'axios';
const apiURL = 'http://localhost:8080/api/';

const apiService = axios.create({
    baseURL: apiURL,
    headers: {
        'Content-Type': 'application/json', 
        "Authorization": 'Bearer ' + localStorage.getItem('token'),
    }

})

export default apiService;