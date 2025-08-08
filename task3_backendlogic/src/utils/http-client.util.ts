import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import type { ApiConfig } from '@/types/api.types';
import { PokemonApiError } from '@/types/api.types';

/**
 * HTTP client wrapper with retry logic and error handling
 */
export class HttpClient {
  private readonly client: AxiosInstance;
  private readonly config: ApiConfig;

  constructor(config: ApiConfig) {
    this.config = config;
    this.client = this.createAxiosInstance();
    this.setupInterceptors();
  }

  /**
   * Perform GET request with automatic retries
   */
  async get<T>(endpoint: string): Promise<T> {
    try {
      const response = await this.executeWithRetry(() =>
        this.client.get<T>(endpoint)
      );
      
      this.log(`✓ GET ${endpoint} - ${response.status}`);
      return response.data;
    } catch (error) {
      this.log(`✗ GET ${endpoint} - Error: ${error}`);
      throw this.transformError(error, endpoint);
    }
  }

  /**
   * Execute request with exponential backoff retry logic
   */
  private async executeWithRetry<T>(
    requestFn: () => Promise<AxiosResponse<T>>,
    attempt: number = 1
  ): Promise<AxiosResponse<T>> {
    try {
      return await requestFn();
    } catch (error) {
      if (attempt < this.config.maxRetries && this.shouldRetry(error)) {
        const delay = this.calculateDelay(attempt);
        this.log(`Retry attempt ${attempt} after ${delay}ms`);
        
        await this.sleep(delay);
        return this.executeWithRetry(requestFn, attempt + 1);
      }
      throw error;
    }
  }

  /**
   * Determine if error is retryable
   */
  private shouldRetry(error: any): boolean {
    if (!error.response) return true; // Network errors
    
    const status = error.response.status;
    return status >= 500 || status === 429; // Server errors or rate limiting
  }

  /**
   * Calculate exponential backoff delay
   */
  private calculateDelay(attempt: number): number {
    return this.config.retryDelay * Math.pow(2, attempt - 1);
  }

  /**
   * Sleep utility for retry delays
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Create configured Axios instance
   */
  private createAxiosInstance(): AxiosInstance {
    return axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'Pokemon-API-Client/1.0.0',
      },
    });
  }

  /**
   * Setup request/response interceptors
   */
  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        this.log(`→ ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        this.log(`→ Request Error: ${error.message}`);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        this.log(`← ${response.status} ${response.statusText}`);
        return response;
      },
      (error) => {
        this.log(`← Response Error: ${error.message}`);
        return Promise.reject(error);
      }
    );
  }

  /**
   * Transform errors into standardized format
   */
  private transformError(error: unknown, endpoint: string): PokemonApiError {
    if (error instanceof AxiosError) {
      const status = error.response?.status;
      const message = error.response?.data?.message || error.message;
      
      return new PokemonApiError(
        `Request failed: ${message}`,
        status,
        endpoint,
        error
      );
    }
    
    if (error instanceof Error) {
      return new PokemonApiError(
        `Unexpected error: ${error.message}`,
        undefined,
        endpoint,
        error
      );
    }
    
    return new PokemonApiError(
      'Unknown error occurred',
      undefined,
      endpoint,
      new Error(String(error))
    );
  }

  /**
   * Conditional logging based on configuration
   */
  private log(message: string): void {
    if (this.config.enableLogging) {
      console.log(`[HttpClient] ${message}`);
    }
  }
}