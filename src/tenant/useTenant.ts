import { useTenantContext } from './useTenantContext';
import { TenantInfo } from './types';

export function useTenant(): TenantInfo {
    const { tenant } = useTenantContext();
    return tenant;
}
