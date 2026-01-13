import { TenantContext } from './tenantContext';
import { TenantInfo } from './types';

export const TenantProvider: React.FC<{
    tenant: TenantInfo;
    children: React.ReactNode;
}> = ({ tenant, children }) => {
    return (
        <TenantContext.Provider value={{ tenant, isReady: true }}>
            {children}
        </TenantContext.Provider>
    );
};
