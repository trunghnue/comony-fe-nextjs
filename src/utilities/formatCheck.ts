export const isArray = (val: unknown): val is any[] => {
  return Array.isArray(val);
};
export const isDefined = <T>(val: T): val is NonNullable<T> => {
  return val !== undefined && val !== null;
};
export const isObject = (val: unknown): val is Record<any, any> => {
  return typeof val === "object" && val !== null && Array.isArray(val) === false;
};
