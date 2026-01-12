import { axiosClient } from '../axiosClient';
import { attachAuthToken } from './request.auth';
import { handleErrorMapping } from './response.mapError';
import { handleAuthError } from './response.refreshToken';

export function registerInterceptors() {
    axiosClient.interceptors.request.use(attachAuthToken);
    axiosClient.interceptors.response.use((res) => res, handleAuthError);
    axiosClient.interceptors.response.use((res) => res, handleErrorMapping);
}
