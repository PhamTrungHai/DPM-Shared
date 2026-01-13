import { TenantInfo, TenantResolutionResult } from './types';

export interface TenantResolverOptions {
    host?: string;
    path?: string;
    tokenPayload?: Record<string, string>;
    fetchTenant?: (tenantCode: string) => Promise<TenantInfo>;
}

/**
 * Resolution order:
 * 1. JWT claim
 * 2. Host (tenant1.example.com)
 * 3. Path (/t/tenant1)
 */
export async function resolveTenant(
    options: TenantResolverOptions
): Promise<TenantResolutionResult> {
    const { host, path, tokenPayload, fetchTenant } = options;

    let tenantCode: string | undefined;
    let source: TenantResolutionResult['source'] | null = null;

    if (tokenPayload?.tenant) {
        tenantCode = tokenPayload.tenant;
        source = 'token';
    } else if (host) {
        tenantCode = host.split('.')[0];
        source = 'host';
    } else if (path?.startsWith('/t/')) {
        tenantCode = path.split('/')[2];
        source = 'path';
    }

    if (!tenantCode || source === null) {
        throw new Error('Tenant cannot be resolved');
    }

    if (!fetchTenant) {
        throw new Error('fetchTenant handler is required');
    }

    const tenant = await fetchTenant(tenantCode);

    return {
        tenant,
        source,
    };
}
