import axios from './axios.ts';
import {getKey} from "./local.ts";

const accessToken = getKey('accessToken');

const post = async (url: string, data: any) => {
    try {
        const response = await axios.post(`${url}`, data, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}

const put = async (url: string, data: any) => {
    try {
        const response = await axios.put(`${url}`, data, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}

const get = async (url: string) => {
    try {
        const response = await axios.get(`${url}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}

const remove = async (url: string) => {
    try {
        const response = await axios.delete(`${url}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}

const getSrc = (url: string) => {
    return `https://backdrops-api.onrender.com/api/static/${url}.png`;
}

export {post, put, get, remove, getSrc}