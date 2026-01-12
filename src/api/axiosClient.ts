import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const axiosClient = axios.create({
    baseURL: API_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});
