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

type HttpErrorDetails = string[];
export class HttpError extends Error {
    status?: number;
    type: HttpErrorType;
    details?: HttpErrorDetails;

    constructor(message: string, type: HttpErrorType, status?: number, details?: HttpErrorDetails) {
        super(message);
        this.name = 'HttpError';
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
    const data = error.response.data as { message?: string; errors?: string[] };
    console.log('mapAxiosError data:', data);

    switch (status) {
        case 400:
            return new HttpError(
                data?.message || 'Validation error',
                'VALIDATION',
                status,
                data.errors
            );
        case 401:
            return new HttpError('Unauthorized', 'UNAUTHORIZED', status);
        case 403:
            return new HttpError('Forbidden', 'FORBIDDEN', status);
        case 404:
            return new HttpError('Not found', 'NOT_FOUND', status);
        case 500:
            return new HttpError('Server error', 'SERVER', status);
        default:
            return new HttpError(data?.message || 'Unknown error', 'UNKNOWN', status, [
                'Unknown error',
            ]);
    }
}
