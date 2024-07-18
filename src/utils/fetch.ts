import axios from 'axios';
import {getKey} from "./local.ts";

const accessToken = getKey('accessToken');

const post = async (url: string, data: any) => {
    try {
        const response = await axios.post(`/api/${url}`, data, {
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
        const response = await axios.put(`/api/${url}`, data, {
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
        const response = await axios.get(`/api/${url}`, {
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
        const response = await axios.delete(`/api/${url}`, {
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
    return `/api/static/${url}.png`;
}

export {post, put, get, remove, getSrc}