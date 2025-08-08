import type { ApiConfig } from '@/types/api.types';

/**
 * Default configuration with sensible defaults
 */
const DEFAULT_CONFIG: ApiConfig = {
  baseURL: 'https://pokeapi.co/api/v2',
  timeout: 10000,
  maxRetries: 3,
  retryDelay: 1000,
  enableLogging: false,
} as const;

/**
 * Create API configuration with environment variable overrides
 */
export function createApiConfig(): ApiConfig {
  return {
    baseURL: process.env.POKEMON_API_BASE_URL ?? DEFAULT_CONFIG.baseURL,
    timeout: parseInt(process.env.POKEMON_API_TIMEOUT ?? String(DEFAULT_CONFIG.timeout), 10),
    maxRetries: parseInt(process.env.POKEMON_API_MAX_RETRIES ?? String(DEFAULT_CONFIG.maxRetries), 10),
    retryDelay: parseInt(process.env.POKEMON_API_RETRY_DELAY ?? String(DEFAULT_CONFIG.retryDelay), 10),
    enableLogging: process.env.POKEMON_API_LOGGING === 'true' || process.env.NODE_ENV === 'development',
  };
}

/**
 * Validate configuration to prevent runtime errors
 */
export function validateApiConfig(config: ApiConfig): void {
  if (!config.baseURL) {
    throw new Error('API base URL is required');
  }
  
  if (config.timeout <= 0) {
    throw new Error('Timeout must be positive');
  }
  
  if (config.maxRetries < 0) {
    throw new Error('Max retries cannot be negative');
  }
  
  if (config.retryDelay < 0) {
    throw new Error('Retry delay cannot be negative');
  }
}

export const API_CONFIG = createApiConfig();