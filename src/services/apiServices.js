import axios from 'axios';
const apiURL = 'http://quorumify-aws-api-env-1.eba-3d3d9mxg.eu-north-1.elasticbeanstalk.com/api/';

const apiService = axios.create({
    baseURL: apiURL,
    headers: {
        'Content-Type': 'application/json',
        "Authorization": 'Bearer ' + localStorage.getItem('token'),
    }

})

export default apiService;