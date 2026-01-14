import axios, { AxiosInstance } from 'axios';
import { registerInterceptors } from './interceptors/register';

let axiosClient: AxiosInstance;

export function createAxiosClient(baseURL: string): AxiosInstance {
    const client = axios.create({
        baseURL,
        timeout: 30_000,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Register interceptors
    registerInterceptors(client);

    axiosClient = client;
    return client;
}

export function getAxiosClient(): AxiosInstance {
    if (!axiosClient) {
        throw new Error('Axios client not initialized');
    }
    return axiosClient;
}
