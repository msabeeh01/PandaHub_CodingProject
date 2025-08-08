import { Pokemon, PokemonSpecies } from './pokemon.types';

export interface ApiConfig {
  readonly baseURL: string;
  readonly timeout: number;
  readonly maxRetries: number;
  readonly retryDelay: number;
  readonly enableLogging: boolean;
}

export interface CacheEntry<T> {
  readonly data: T;
  readonly timestamp: number;
  readonly expiresAt: number;
}

export interface ApiResponse<T> {
  readonly data: T;
  readonly success: boolean;
  readonly error?: string;
  readonly timestamp: number;
}

export interface PokemonQuery {
  readonly limit?: number;
  readonly offset?: number;
}

export interface EnhancedPokemon {
  readonly pokemon: Pokemon;
  readonly species: PokemonSpecies;
}

export class PokemonApiError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly endpoint?: string,
    public readonly cause?: Error
  ) {
    super(message);
    this.name = 'PokemonApiError';
    
    // Maintain proper stack trace for debugging
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, PokemonApiError);
    }
  }
}

// Re-export for convenience
export type {
  Pokemon,
  PokemonSpecies,
  Type,
  PaginatedResponse,
  PokemonListItem,
} from './pokemon.types';