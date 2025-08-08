import { HttpClient } from '@/utils/http-client.util';
import { MemoryCache } from '@/utils/cache.util';
import { API_CONFIG, validateApiConfig } from '@/config/api.config';
import type {
  ApiConfig,
  Pokemon,
  PokemonSpecies,
  Type,
  PaginatedResponse,
  PokemonListItem,
  EnhancedPokemon,
  ApiResponse,
} from '@/types/api.types';

/**
 * Comprehensive Pokemon API service
 * Handles all Pokemon-related operations with caching and error handling
 */
export class PokemonService {
  private readonly http: HttpClient;
  private readonly cache: MemoryCache;
  private readonly config: ApiConfig;

  constructor(config: ApiConfig = API_CONFIG) {
    validateApiConfig(config);
    
    this.config = config;
    this.http = new HttpClient(config);
    this.cache = new MemoryCache(5 * 60 * 1000); // 5 minute cache
  }

  /**
   * Get Pokemon by name or ID
   */
  async getPokemon(nameOrId: string | number): Promise<Pokemon> {
    const cacheKey = `pokemon:${nameOrId}`;
    
    // Try cache first
    const cached = this.cache.get<Pokemon>(cacheKey);
    if (cached) {
      this.log(`Cache hit for Pokemon: ${nameOrId}`);
      return cached;
    }

    // Fetch from API
    const pokemon = await this.http.get<Pokemon>(`/pokemon/${nameOrId}`);
    this.cache.set(cacheKey, pokemon);
    
    this.log(`Fetched Pokemon: ${pokemon.name} (ID: ${pokemon.id})`);
    return pokemon;
  }

  /**
   * Get paginated list of Pokemon
   */
  async getPokemonList(limit = 20, offset = 0): Promise<PaginatedResponse<PokemonListItem>> {
    const cacheKey = `pokemon-list:${limit}:${offset}`;
    
    const cached = this.cache.get<PaginatedResponse<PokemonListItem>>(cacheKey);
    if (cached) {
      this.log(`Cache hit for Pokemon list: limit=${limit}, offset=${offset}`);
      return cached;
    }

    const response = await this.http.get<PaginatedResponse<PokemonListItem>>(
      `/pokemon?limit=${limit}&offset=${offset}`
    );
    
    this.cache.set(cacheKey, response);
    this.log(`Fetched Pokemon list: ${response.results.length} items`);
    
    return response;
  }

  /**
   * Get Pokemon species information
   */
  async getPokemonSpecies(nameOrId: string | number): Promise<PokemonSpecies> {
    const cacheKey = `species:${nameOrId}`;
    
    const cached = this.cache.get<PokemonSpecies>(cacheKey);
    if (cached) {
      this.log(`Cache hit for Pokemon species: ${nameOrId}`);
      return cached;
    }

    const species = await this.http.get<PokemonSpecies>(`/pokemon-species/${nameOrId}`);
    this.cache.set(cacheKey, species);
    
    this.log(`Fetched Pokemon species: ${species.name}`);
    return species;
  }

  /**
   * Get type information
   */
  async getType(nameOrId: string | number): Promise<Type> {
    const cacheKey = `type:${nameOrId}`;
    
    const cached = this.cache.get<Type>(cacheKey);
    if (cached) {
      this.log(`Cache hit for type: ${nameOrId}`);
      return cached;
    }

    const type = await this.http.get<Type>(`/type/${nameOrId}`);
    this.cache.set(cacheKey, type);
    
    this.log(`Fetched type: ${type.name} (${type.pokemon.length} Pokemon)`);
    return type;
  }

  /**
   * Get Pokemon with species data in single call
   */
  async getPokemonWithSpecies(nameOrId: string | number): Promise<EnhancedPokemon> {
    const cacheKey = `enhanced:${nameOrId}`;
    
    const cached = this.cache.get<EnhancedPokemon>(cacheKey);
    if (cached) {
      this.log(`Cache hit for enhanced Pokemon: ${nameOrId}`);
      return cached;
    }

    // Fetch both concurrently for better performance
    const [pokemon, species] = await Promise.all([
      this.getPokemon(nameOrId),
      this.getPokemonSpecies(nameOrId),
    ]);

    const enhanced: EnhancedPokemon = { pokemon, species };
    this.cache.set(cacheKey, enhanced);
    
    this.log(`Created enhanced Pokemon data for: ${pokemon.name}`);
    return enhanced;
  }

  /**
   * Search Pokemon by name (client-side filtering)
   */
  async searchPokemon(query: string, limit = 10): Promise<PokemonListItem[]> {
    if (!query || query.length < 2) {
      return [];
    }

    // For demo purposes, search within first 1000 Pokemon
    const response = await this.getPokemonList(1000, 0);
    
    const results = response.results
      .filter(pokemon => 
        pokemon.name.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, limit);
    
    this.log(`Search "${query}" found ${results.length} results`);
    return results;
  }

  /**
   * Get multiple Pokemon in batch
   */
  async getPokemonBatch(namesOrIds: (string | number)[]): Promise<Pokemon[]> {
    this.log(`Fetching batch of ${namesOrIds.length} Pokemon`);
    
    const promises = namesOrIds.map(id => this.getPokemon(id));
    const results = await Promise.allSettled(promises);
    
    const pokemon = results
      .filter((result): result is PromiseFulfilledResult<Pokemon> => 
        result.status === 'fulfilled'
      )
      .map(result => result.value);
    
    const failed = results.filter(result => result.status === 'rejected').length;
    if (failed > 0) {
      this.log(`Batch operation: ${pokemon.length} succeeded, ${failed} failed`);
    }
    
    return pokemon;
  }

  /**
   * Get random Pokemon
   */
  async getRandomPokemon(): Promise<Pokemon> {
    const randomId = Math.floor(Math.random() * 1010) + 1; // Gen 1-8
    this.log(`Getting random Pokemon with ID: ${randomId}`);
    return this.getPokemon(randomId);
  }

  /**
   * Get Pokemon stats summary
   */
  async getPokemonStats(nameOrId: string | number): Promise<{
    name: string;
    totalStats: number;
    highestStat: { name: string; value: number };
    types: string[];
  }> {
    const pokemon = await this.getPokemon(nameOrId);
    
    const totalStats = pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0);
    const highestStat = pokemon.stats.reduce((highest, stat) => 
      stat.base_stat > highest.base_stat ? stat : highest
    );
    
    return {
      name: pokemon.name,
      totalStats,
      highestStat: {
        name: highestStat.stat.name,
        value: highestStat.base_stat,
      },
      types: pokemon.types.map(type => type.type.name),
    };
  }

  /**
   * Clear all cached data
   */
  clearCache(): void {
    this.cache.clear();
    this.log('Cache cleared');
  }

  /**
   * Get cache statistics
   */
  getCacheStats() {
    const stats = this.cache.getStats();
    this.log(`Cache stats: ${stats.validEntries}/${stats.totalEntries} valid entries`);
    return stats;
  }

  /**
   * Cleanup resources
   */
  destroy(): void {
    this.cache.destroy();
    this.log('Service destroyed');
  }

  /**
   * Conditional logging
   */
  private log(message: string): void {
    if (this.config.enableLogging) {
      console.log(`[PokemonService] ${message}`);
    }
  }
}