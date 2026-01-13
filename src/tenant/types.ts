export type TenantId = string;

export interface TenantInfo {
    id: TenantId;
    code: string;
    name: string;
    apiBaseUrl: string;
    theme?: string;
    features?: Record<string, boolean>;
    metadata?: Record<string, unknown>;
}

export interface TenantConfig {
    theme: string;
    features: Record<string, boolean>;
    permissions: string[];
}

export type TenantSource = 'host' | 'path' | 'token' | 'manual';

export interface TenantResolutionResult {
    tenant: TenantInfo;
    source: TenantSource;
}
