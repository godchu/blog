export const isDev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';

export const isBrowser = globalThis.window !== undefined;

export function isFunction(val) {
  return typeof val === 'function';
}
