import { useContext } from 'react';
import { TenantContext, TenantContextValue } from './tenantContext';

export function useTenantContext(): TenantContextValue {
    const ctx = useContext(TenantContext);

    if (!ctx) {
        throw new Error('useTenantContext must be used inside TenantProvider');
    }

    return ctx;
}
