export default function authHeader() {
    const userToken = localStorage.getItem('token');
    if (userToken) {
        return { "Authorization": 'Bearer ' + userToken }
    } else {
        return {};
    }
}