import { isObject, encode, decode } from './lib/utils';

class Cookie {
  cookie: string;
  constructor() {
    this.cookie = document.cookie;
  }
  public set(key: any, value: any, options?: any): Cookie {
    if (isObject(key)) {
      for (const v in key) {
        if (key.hasOwnProperty(v)) this.set(v, key[v], options);
      }
    } else {
      const inOptions = options || { path: '/' };

      if (typeof inOptions.expires === 'number') {
        inOptions.expires = new Date(Date.now() + inOptions.expires * 864e5);
      }

      let expires = inOptions.expires ? inOptions.expires : '';
      const expiresType = typeof expires;

      if (expiresType && expiresType === 'string') {
        expires = new Date(expires);
      } else if (expiresType === 'number') {
        // ! 因为IE不支持“max-age”cookie属性
        expires = new Date(Date.now() + ((expires as unknown) as number) * 864e5);
      }

      if (expires) {
        inOptions.expires = (expires as Date).toUTCString();
        expires = ';expires=' + (expires as Date).toUTCString();
      }

      // 对其他的参数进行匹配
      /**
       * path
       * domain
       * secure
       * sameSite
       */
      let train = '';
      for (const o in inOptions) {
        if (inOptions[o]) {
          train += '; ' + o;
          // secure 配置
          if (inOptions[o] === true) continue;
          train += '=' + inOptions[o].split(';')[0];
        }
      }
      // 对 key 与 value 进行 ASCII 等装换
      key = encode(key);
      value = encode(value);

      document.cookie = key + '=' + value + train;
    }
    return this;
  }

  public get(key: any) {
    const cookies: {
      [key: string]: any;
    } = this.all();

    if (!Array.isArray(key as string)) return cookies[key];

    const result: {
      [key: string]: any;
    } = {};

    key.forEach((v: string | number) => {
      result[v] = cookies[v];
    });

    return result;
  }

  public all(): object {
    if (document.cookie === '') return {};

    const result: any = {};
    const cookies = document.cookie ? document.cookie.split('; ') : [];

    cookies.forEach((v) => {
      // ['a', 'b=b=b=b=b=b=b']
      const parts: any[] = v.split('=');
      const key = decode(parts.shift());
      const value = decode(parts.join('='));
      result[key] = value;
    });

    return result;
  }

  public remove(key: any) {
    const keys = Array.isArray(key) ? key : [key];
    keys.forEach((v) => this.set(v, '', { expires: -1 }));
    return this;
  }

  public clear() {
    return this.remove(Object.keys(this.all()));
  }
}

/**
 * set 函数 key value  增 改
 * get 函数 key 查
 * remove 函数 删
 */

let cookie = null;
if (typeof document === 'undefined') {
  // tslint:disable-next-line:no-console
  console.error('The library is not supported in the current environment');
} else {
  cookie = new Cookie();
}

export default cookie;
