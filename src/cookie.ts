
import { isObject } from './lib/utils';

class Cookie {
    cookie: string
    constructor() {
        this.cookie = document.cookie
    }
    public set(key: string | object, value: any, options?: object): void {
        if (isObject(key)) {
            Object.keys(key).forEach(v => this.set(v, key[v], value))
        }
    }

    public get() { }

    public remove() { }
}


/**
 * set 函数 key value  增 改
 * get 函数 key 查
 * remove 函数 删
 */

let cookie = null
if (typeof document === "undefined") {
    console.error('The library is not supported in the current environment')
} else {
    cookie = new Cookie()
}

export default cookie