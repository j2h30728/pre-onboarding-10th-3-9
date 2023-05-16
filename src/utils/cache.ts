import { FIVE_MINUTES_IN_MS } from './const';

interface CacheMap {
  [key: string]: { expireTime: number; data: unknown };
}

const isExpired = (time: number) => {
  return time < Date.now();
};

class Cache {
  private cache: CacheMap;

  private cacheTime: number;

  constructor(cacheTime = FIVE_MINUTES_IN_MS) {
    this.cache = {};
    this.cacheTime = cacheTime;
  }

  private has(key: string) {
    return this.cache[key] !== undefined;
  }

  set(key: string, data: unknown): void {
    this.cache[key] = {
      data,
      expireTime: Date.now() + this.cacheTime,
    };
  }

  remove(key: string): void {
    if (this.cache[key]) {
      delete this.cache[key];
    }
  }

  clear(): void {
    this.cache = {};
  }

  get<T>(key: string): T | undefined {
    if (this.has(key)) {
      const { data, expireTime } = this.cache[key];
      if (isExpired(expireTime)) {
        this.remove(key);
      } else {
        return data as T;
      }
    }
    return undefined;
  }

  getAll() {
    return Object.entries(this.cache).reduce((acc, [key, { expireTime, data }]) => {
      return isExpired(expireTime) ? acc : { ...acc, [key]: data };
    }, {});
  }
}

export default Cache;
