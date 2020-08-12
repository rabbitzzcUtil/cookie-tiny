export const isObject: (obj: any) => boolean = (obj: any): obj is object => {
  return !!obj && Object.prototype.toString.call(obj) === '[object Object]';
};

export const encode = (str: string): string => {
  return String(str).replace(/[,;"\\=\s%]/g, (char) => {
    return encodeURIComponent(char);
  });
};

export const decode = (str: string): string => {
  return decodeURIComponent(str);
};
