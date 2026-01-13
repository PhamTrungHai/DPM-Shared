import enCommon from './locales/en/common.json';
import viCommon from './locales/vi/common.json';
import enError from './locales/en/error.json';
import viError from './locales/vi/error.json';

export const resources = {
    en: {
        common: enCommon,
        error: enError,
    },
    vi: {
        common: viCommon,
        error: viError,
    },
} as const;
