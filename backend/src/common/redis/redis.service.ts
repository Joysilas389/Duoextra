import { Injectable, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private client: any = null;
  private connected = false;

  constructor(private config: ConfigService) {
    const url = config.get<string>('REDIS_URL');
    if (url) {
      try {
        const Redis = require('ioredis');
        this.client = new Redis(url as string);
        this.client.on('connect', () => { this.connected = true; });
        this.client.on('error', (err) => { this.logger.warn('Redis not available, using in-memory fallback'); this.connected = false; });
      } catch { this.logger.warn('Redis not available'); }
    }
  }

  private cache = new Map<string, { value: string; expires?: number }>();

  async get(key: string): Promise<string | null> {
    if (this.connected && this.client) return this.client.get(key);
    const item = this.cache.get(key);
    if (!item) return null;
    if (item.expires && item.expires < Date.now()) { this.cache.delete(key); return null; }
    return item.value;
  }

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    if (this.connected && this.client) { if (ttlSeconds) await this.client.set(key, value, 'EX', ttlSeconds); else await this.client.set(key, value); return; }
    this.cache.set(key, { value, expires: ttlSeconds ? Date.now() + ttlSeconds * 1000 : undefined });
  }

  async del(key: string): Promise<void> {
    if (this.connected && this.client) { await this.client.del(key); return; }
    this.cache.delete(key);
  }

  async incr(key: string): Promise<number> {
    if (this.connected && this.client) return this.client.incr(key);
    const val = parseInt(this.cache.get(key)?.value || '0') + 1;
    this.cache.set(key, { value: String(val) });
    return val;
  }

  onModuleDestroy() {
    if (this.client) try { this.client.disconnect(); } catch {}
  }
}
