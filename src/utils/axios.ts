import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://backdrops-api.onrender.com/api',
    // baseURL: 'http://localhost:9060/api',

});

export default instance;