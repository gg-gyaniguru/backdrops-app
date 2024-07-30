import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://backdrops-api.onrender.com/api',
});

export default instance;