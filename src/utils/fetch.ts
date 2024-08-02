import axios from './axios.ts';

const post = async (url: string, data: any) => {
    try {
        const response = await axios.post(`${url}`, data);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}

const put = async (url: string, data: any) => {
    try {
        const response = await axios.put(`${url}`, data);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}

const get = async (url: string) => {
    try {
        const response = await axios.get(`${url}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}

const remove = async (url: string) => {
    try {
        const response = await axios.delete(`${url}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}

const getSrc = (src: string) => {
    return `https://res.cloudinary.com/backdrops-storage/image/upload/v${src}.png`;
}

export {post, put, get, remove, getSrc}