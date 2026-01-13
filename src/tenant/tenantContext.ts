import { TenantInfo } from './types';
import { createContext } from 'react';

export interface TenantContextValue {
    tenant: TenantInfo;
    isReady: boolean;
}

export const TenantContext = createContext<TenantContextValue | null>(null);
