export const isObject: (obj: any) => boolean = (obj:any): obj is object => {
    return !!obj && Object.prototype.toString.call(obj) === '[object Object]'
}