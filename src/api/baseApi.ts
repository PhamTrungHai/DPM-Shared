import { Identifiable } from '@/types/base';
import { axiosClient } from './axiosClient';
import type { AxiosRequestConfig, AxiosError } from 'axios';

export type ApiOptions = AxiosRequestConfig & {
    signal?: AbortSignal;
};

export abstract class BaseApi<TEntity extends Identifiable> {
    protected basePath: string;
    protected version: number;
    protected signal: AbortSignal;
    private urlPrefix: string;

    /**
     * Initializes a new instance of the BaseApi class.
     *
     * @param basePath - The base URL path for all API requests
     * @param version - The API version to use for requests
     * @param signal - An AbortSignal to allow cancellation of in-flight requests
     */
    constructor(basePath: string, version: number, signal: AbortSignal) {
        this.basePath = basePath;
        this.version = version;
        this.signal = signal;
        this.urlPrefix = `/api${this.basePath}/v${this.version}`;
    }
    private async request<TResponse>(config: AxiosRequestConfig): Promise<TResponse> {
        try {
            const response = await axiosClient.request<TResponse>(config);
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

    get<TResponse>(endpoint: string, params?: Record<string, unknown>) {
        return this.request<TResponse>({
            url: `${this.urlPrefix}${endpoint}`,
            method: 'GET',
            params,
            signal: this.signal,
        });
    }

    post<TResponse, TBody>(endpoint: string, body?: TBody) {
        return this.request<TResponse>({
            url: `${this.urlPrefix}${endpoint}`,
            method: 'POST',
            data: body,
            signal: this.signal,
        });
    }

    put<TResponse, TBody>(endpoint: string, body?: TBody) {
        return this.request<TResponse>({
            url: `${this.urlPrefix}${endpoint}`,
            method: 'PUT',
            data: body,
            signal: this.signal,
        });
    }

    delete<TResponse>(endpoint: string) {
        return this.request<TResponse>({
            url: `${this.urlPrefix}${endpoint}`,
            method: 'DELETE',
            signal: this.signal,
        });
    }
}
