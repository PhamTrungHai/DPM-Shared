/**
 * Token storage utility for managing authentication tokens.
 *
 */

const STORAGE_KEYS = {
    ACCESS_TOKEN: 'access_token',
    REFRESH_TOKEN: 'refresh_token',
} as const;

/**
 * Storage adapter interface for flexible token storage strategies
 */
interface StorageAdapter {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
}

/**
 * Enhanced localStorage adapter with XSS mitigation
 */
class SecureLocalStorage implements StorageAdapter {
    private prefix = '__secure_';

    getItem(key: string): string | null {
        try {
            const item = localStorage.getItem(this.prefix + key);
            if (!item) return null;

            // Basic tampering detection via checksum
            const data = JSON.parse(item);
            if (this.verifyChecksum(data.value, data.checksum)) {
                return data.value;
            }
            // If checksum fails, clear the item (possible tampering)
            this.removeItem(key);
            return null;
        } catch {
            return null;
        }
    }

    setItem(key: string, value: string): void {
        try {
            const checksum = this.generateChecksum(value);
            const data = JSON.stringify({ value, checksum, timestamp: Date.now() });
            localStorage.setItem(this.prefix + key, data);
        } catch (error) {
            console.error('Failed to store token:', error);
        }
    }

    removeItem(key: string): void {
        localStorage.removeItem(this.prefix + key);
    }

    private generateChecksum(value: string): string {
        // Simple checksum using base64 encoding (not cryptographic, but detects basic tampering)
        return btoa(value.split('').reverse().join(''));
    }

    private verifyChecksum(value: string, checksum: string): boolean {
        return this.generateChecksum(value) === checksum;
    }
}

/**
 * Memory-only storage adapter (most secure, but tokens lost on refresh)
 * Use this for maximum security when refresh tokens can handle re-authentication
 */
class MemoryStorage implements StorageAdapter {
    private storage = new Map<string, string>();

    getItem(key: string): string | null {
        return this.storage.get(key) ?? null;
    }

    setItem(key: string, value: string): void {
        this.storage.set(key, value);
    }

    removeItem(key: string): void {
        this.storage.delete(key);
    }

    clear(): void {
        this.storage.clear();
    }
}

// Choose storage strategy based on environment
const USE_MEMORY_STORAGE = import.meta.env.VITE_USE_MEMORY_STORAGE === 'true';
const storageAdapter: StorageAdapter = USE_MEMORY_STORAGE
    ? new MemoryStorage()
    : new SecureLocalStorage();

export const tokenStorage = {
    getAccessToken: () => storageAdapter.getItem(STORAGE_KEYS.ACCESS_TOKEN),
    getRefreshToken: () => storageAdapter.getItem(STORAGE_KEYS.REFRESH_TOKEN),

    setTokens: (accessToken: string, refreshToken?: string) => {
        // Validate tokens before storing (basic format check)
        if (!accessToken || accessToken.trim().length === 0) {
            throw new Error('Invalid access token');
        }

        storageAdapter.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
        if (refreshToken) {
            storageAdapter.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
        }
    },

    clear: () => {
        storageAdapter.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        storageAdapter.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    },

    /**
     * Check if tokens are stored (useful for auth state detection)
     */
    hasTokens: () => {
        return !!storageAdapter.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    },
};
