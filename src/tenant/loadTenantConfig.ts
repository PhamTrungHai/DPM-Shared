import { TenantConfig } from './types';

export async function loadTenantConfig(tenantCode: string): Promise<TenantConfig> {
    const res = await fetch(`/config/${tenantCode}.json`);

    if (!res.ok) {
        throw new Error(`Config not found for tenant: ${tenantCode}`);
    }

    return res.json();
}
