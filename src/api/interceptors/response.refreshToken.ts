import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { axiosClient } from '../axiosClient';
import { tokenStorage } from '@/utils/tokenStorage';

let isRefreshing = false;
let failedQueue: {
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach((p) => {
        if (error) p.reject(error);
        else p.resolve(token!);
    });
    failedQueue = [];
};

export const handleAuthError = async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
    };

    if (error.response?.status !== 401 || originalRequest._retry) {
        return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
        return new Promise((resolve, reject) => {
            failedQueue.push({
                resolve: (token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    resolve(axiosClient(originalRequest));
                },
                reject,
            });
        });
    }

    isRefreshing = true;

    try {
        const refreshToken = tokenStorage.getRefreshToken();

        const response = await axios.post(`${axiosClient.defaults.baseURL}/auth/refresh`, {
            refreshToken,
        });

        const { accessToken, refreshToken: newRefresh } = response.data;

        tokenStorage.setTokens(accessToken, newRefresh);
        axiosClient.defaults.headers.Authorization = `Bearer ${accessToken}`;

        processQueue(null, accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosClient(originalRequest);
    } catch (err) {
        processQueue(err, null);
        tokenStorage.clear();
        window.location.href = '/login';
        return Promise.reject(err);
    } finally {
        isRefreshing = false;
    }
};
