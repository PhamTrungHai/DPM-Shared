import { AxiosError } from 'axios';
import { mapAxiosError } from '../httpError';

export const handleErrorMapping = async (error: AxiosError) => {
    return Promise.reject(mapAxiosError(error));
};
