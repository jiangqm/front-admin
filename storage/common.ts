
// 存储接口类型定义
interface StorageInterface {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

// 配置选项类型定义
interface StorageOptions {
  name: string;
  storage?: StorageInterface;
  domain?: string;
}

// 存储配置类型
interface StorageConfig extends Required<StorageOptions> {
  name: string;
  storage: StorageInterface;
  domain: string;
}

// 初始化存储对象（SSR安全）
const createInitStorage = (): StorageInterface => ({
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
});

const initStorage: StorageInterface = createInitStorage();
// StorageItem 基类
class StorageItem<T = unknown> {
  protected readonly config: StorageConfig;

  constructor(options: StorageOptions) {
    this.config = {
      name: options.name,
      storage: options.storage ?? initStorage,
      domain: options.domain ?? '',
    };
  }

  protected get storage(): StorageInterface {
    return this.config.storage;
  }

  /**
   * 获取原始字符串值
   */
  get(): string | null {
    try {
      const value = this.storage.getItem(this.config.name);
      if (value === null) return null;
      return  value;
    } catch (error) {
      console.error(`获取存储值失败 [${this.config.name}]:`, error);
      return null;
    }
  }

  /**
   * 设置字符串值
   */
  set(value: string): void {
    try {
    
      this.storage.setItem(this.config.name, value);
    } catch (error) {
      console.error(`存储空间不足 [${this.config.name}]:`, error);
      throw new Error('Storage quota exceeded');
    }
  }

  /**
   * 获取JSON对象
   */
  getJSON<K = T>(): K | null {
    try {
      const rawValue = this.storage.getItem(this.config.name);
      if (rawValue === null) return null;

      return JSON.parse(rawValue) as K;
    } catch (error) {
      console.error(`解析JSON失败 [${this.config.name}]:`, error);
      return null;
    }
  }

  /**
   * 设置JSON对象
   */
  setJSON(value: T): void {
    if (value !== null && value !== undefined && typeof value !== 'object') {
      throw new Error('值必须是对象或数组类型');
    }
    
    try {
      const jsonString = JSON.stringify(value);
      this.set(jsonString);
    } catch (error) {
      console.error(`序列化JSON失败 [${this.config.name}]:`, error);
      throw new Error('Failed to serialize JSON');
    }
  }

  /**
   * 移除存储项
   */
  remove(): void {
    try {
      this.storage.removeItem(this.config.name);
    } catch (error) {
      console.error(`移除存储项失败 [${this.config.name}]:`, error);
    }
  }

  /**
   * 检查存储项是否存在
   */
  exists(): boolean {
    return this.get() !== null;
  }
}

// SessionStorage 实现
class SessionItem<T = unknown> extends StorageItem<T> {
  constructor(options: StorageOptions) {
    const sessionOptions: StorageOptions = {
      ...options,
      storage: typeof window !== 'undefined' ? window.sessionStorage : initStorage,
    };
    super(sessionOptions);
  }
}

// LocalStorage 实现
class LocalItem<T = unknown> extends StorageItem<T> {
  constructor(options: StorageOptions) {
    const localOptions: StorageOptions = {
      ...options,
      storage: typeof window !== 'undefined' ? window.localStorage : initStorage,
    };
    super(localOptions);
  }
}

// Cookie选项类型
interface CookieSetOptions {
  validSeconds?: number;
  domain?: string;
  path?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

// Cookie 实现
class CookieItem<T = unknown> {
  private readonly options: StorageOptions;

  constructor(options: StorageOptions) {
    this.options = options;
  }

  /**
   * 获取cookie值
   */
  get(): string | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const cookies = document.cookie.split(';');
      const cookie = cookies.find(c => 
        c.trim().startsWith(`${this.options.name}=`)
      );
      
      if (!cookie) return null;
      
      const value = cookie.split('=')[1];
      return value ? decodeURIComponent(value) : null;
    } catch (error) {
      console.error(`获取Cookie失败 [${this.options.name}]:`, error);
      return null;
    }
  }

  /**
   * 设置cookie值
   */
  set(value: string, options: CookieSetOptions = {}): void {
    if (typeof window === 'undefined') return;
    
    const {
      validSeconds = 7 * 24 * 60 * 60, // 默认7天
      domain,
      path = '/',
      secure = false,
      sameSite = 'lax'
    } = options;

    try {
      let cookieString = `${this.options.name}=${encodeURIComponent(value)}`;
      
      if (validSeconds > 0) {
        const expires = new Date(Date.now() + validSeconds * 1000);
        cookieString += `; expires=${expires.toUTCString()}`;
      }
      
      cookieString += `; path=${path}`;
      
      if (domain || this.options.domain) {
        cookieString += `; domain=${this.options.domain || domain}`;
      }
      
      if (secure) {
        cookieString += `; secure`;
      }
      
      cookieString += `; samesite=${sameSite}`;
      
      document.cookie = cookieString;
    } catch (error) {
      console.error(`设置Cookie失败 [${this.options.name}]:`, error);
      throw new Error('Failed to set cookie');
    }
  }

  /**
   * 获取JSON对象
   */
  getJSON<K = T>(): K | null {
    try {
      const value = this.get();
      if (value === null) return null;
      return JSON.parse(value) as K;
    } catch (error) {
      console.error(`解析Cookie JSON失败 [${this.options.name}]:`, error);
      return null;
    }
  }

  /**
   * 设置JSON对象
   */
  setJSON(value: T, options?: CookieSetOptions): void {
    try {
      const jsonString = JSON.stringify(value);
      this.set(jsonString, options);
    } catch (error) {
      console.error(`序列化Cookie JSON失败 [${this.options.name}]:`, error);
      throw new Error('Failed to serialize JSON to cookie');
    }
  }

  /**
   * 移除cookie
   */
  remove(): void {
    if (typeof window === 'undefined') return;
    
    try {
      let cookieString = `${this.options.name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/`;
      
      if (this.options.domain) {
        cookieString += `; domain=${this.options.domain}`;
      }
      
      document.cookie = cookieString;
    } catch (error) {
      console.error(`移除Cookie失败 [${this.options.name}]:`, error);
    }
  }

  /**
   * 检查cookie是否存在
   */
  exists(): boolean {
    return this.get() !== null;
  }
}

export {LocalItem, SessionItem, CookieItem}
