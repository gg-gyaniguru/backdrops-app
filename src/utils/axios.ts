import axios from 'axios';
import {getKey} from "./local.ts";

const accessToken = getKey('accessToken');

const {VITE_SECRET_KEY, VITE_API_URL} = import.meta.env;

const instance = axios.create({
    // baseURL: VITE_API_URL,
    baseURL: 'http://localhost:9060/api',
    headers: {
        'Secret': VITE_SECRET_KEY,
        'Authorization': `Bearer ${accessToken}`
    }
});

export default instance;