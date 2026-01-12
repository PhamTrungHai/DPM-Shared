import { AxiosError } from 'axios';

export type HttpErrorType =
    | 'NETWORK'
    | 'UNAUTHORIZED'
    | 'FORBIDDEN'
    | 'NOT_FOUND'
    | 'VALIDATION'
    | 'BUSINESS'
    | 'SERVER'
    | 'UNKNOWN';

export class HttpError extends Error {
    status?: number;
    type: HttpErrorType;
    details?: unknown;

    constructor(message: string, type: HttpErrorType, status?: number, details?: unknown) {
        super(message);
        this.type = type;
        this.status = status;
        this.details = details;
    }
}

export function mapAxiosError(error: AxiosError): HttpError {
    if (!error.response) {
        return new HttpError('Network error', 'NETWORK');
    }

    const status = error.response.status;
    const data: any = error.response.data;

    switch (status) {
        case 400:
            return new HttpError(data?.message || 'Validation error', 'VALIDATION', status, data);
        case 401:
            return new HttpError('Unauthorized', 'UNAUTHORIZED', status);
        case 403:
            return new HttpError('Forbidden', 'FORBIDDEN', status);
        case 404:
            return new HttpError('Not found', 'NOT_FOUND', status);
        case 500:
            return new HttpError('Server error', 'SERVER', status);
        default:
            return new HttpError(data?.message || 'Unknown error', 'UNKNOWN', status, data);
    }
}
