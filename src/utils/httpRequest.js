import axios from 'axios';

const httpRequest = axios.create({
    // baseURL: process.env.REACT_APP_BASE_URL,
    baseURL: 'https://api.levanphuc.asia',
});

export default httpRequest;
