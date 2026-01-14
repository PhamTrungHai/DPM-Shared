import { getAxiosClient } from './axiosClient';
import type { AxiosRequestConfig, AxiosError } from 'axios';

export type ApiOptions = AxiosRequestConfig & {
    signal?: AbortSignal;
};

async function request<TResponse>(config: AxiosRequestConfig): Promise<TResponse> {
    try {
        const response = await getAxiosClient().request<TResponse>(config);
        return response.data as TResponse;
    } catch (err) {
        const axiosErr = err as AxiosError;
        if (axiosErr?.isAxiosError) {
            const status = axiosErr.response?.status;
            const data = axiosErr.response?.data;
            throw new Error(
                `API Error ${status ?? 'Network'}: ${
                    typeof data === 'string' ? data : JSON.stringify(data)
                }`
            );
        }
        throw err;
    }
}

export async function get<TResponse>(
    endpoint: string,
    params?: Record<string, unknown>,
    signal?: AbortSignal
) {
    return request<TResponse>({
        url: `${endpoint}`,
        method: 'GET',
        params,
        signal,
    });
}

export async function post<TResponse, TBody>(endpoint: string, body?: TBody, signal?: AbortSignal) {
    return request<TResponse>({
        url: `${endpoint}`,
        method: 'POST',
        data: body,
        signal,
    });
}

export async function put<TResponse, TBody>(endpoint: string, body?: TBody, signal?: AbortSignal) {
    return request<TResponse>({
        url: `${endpoint}`,
        method: 'PUT',
        data: body,
        signal,
    });
}

export async function del<TResponse>(endpoint: string, signal?: AbortSignal) {
    return request<TResponse>({
        url: `${endpoint}`,
        method: 'DELETE',
        signal,
    });
}
