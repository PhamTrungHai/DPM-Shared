import { InternalAxiosRequestConfig } from 'axios';
import { tokenStorage } from '@/utils/tokenStorage';

export const attachAuthToken = (config: InternalAxiosRequestConfig) => {
    const token = tokenStorage.getAccessToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
};
