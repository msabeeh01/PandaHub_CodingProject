import type { CacheEntry } from '@/types/api.types';

/**
 * Thread-safe in-memory cache with TTL support
 */
export class MemoryCache {
  private readonly storage = new Map<string, CacheEntry<any>>();
  private readonly defaultTTL: number;
  private cleanupInterval?: NodeJS.Timeout;

  constructor(defaultTTL: number = 5 * 60 * 1000) { // 5 minutes default
    this.defaultTTL = defaultTTL;
    this.startCleanupTimer();
  }

  /**
   * Store data in cache with optional custom TTL
   */
  set<T>(key: string, data: T, ttl?: number): void {
    const now = Date.now();
    const entry: CacheEntry<T> = {
      data,
      timestamp: now,
      expiresAt: now + (ttl ?? this.defaultTTL),
    };
    
    this.storage.set(key, entry);
  }

  /**
   * Retrieve data from cache if not expired
   */
  get<T>(key: string): T | undefined {
    const entry = this.storage.get(key) as CacheEntry<T> | undefined;
    
    if (!entry) return undefined;
    
    if (Date.now() > entry.expiresAt) {
      this.storage.delete(key);
      return undefined;
    }
    
    return entry.data;
  }

  /**
   * Check if key exists and is valid
   */
  has(key: string): boolean {
    return this.get(key) !== undefined;
  }

  /**
   * Delete specific entry
   */
  delete(key: string): boolean {
    return this.storage.delete(key);
  }

  /**
   * Clear all entries
   */
  clear(): void {
    this.storage.clear();
  }

  /**
   * Get cache statistics
   */
  getStats() {
    const entries = Array.from(this.storage.values());
    const now = Date.now();
    const expired = entries.filter(entry => now > entry.expiresAt).length;
    
    return {
      totalEntries: this.storage.size,
      validEntries: this.storage.size - expired,
      expiredEntries: expired,
      oldestEntry: entries.reduce((oldest, entry) => 
        !oldest || entry.timestamp < oldest ? entry.timestamp : oldest, 0),
    };
  }

  /**
   * Start automatic cleanup of expired entries
   */
  private startCleanupTimer(): void {
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 60000); // Cleanup every minute
  }

  /**
   * Remove expired entries from cache
   */
  private cleanup(): void {
    const now = Date.now();
    const expiredKeys: string[] = [];
    
    for (const [key, entry] of this.storage.entries()) {
      if (now > entry.expiresAt) {
        expiredKeys.push(key);
      }
    }
    
    expiredKeys.forEach(key => this.storage.delete(key));
  }

  /**
   * Cleanup resources
   */
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    this.clear();
  }
}