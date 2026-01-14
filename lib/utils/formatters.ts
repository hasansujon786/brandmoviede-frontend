import qs from "qs";

/**
 * Converts an object to a query string using the qs library.
 * @param params - An object where the keys are query parameter names and values can be strings, numbers, arrays, or objects.
 * @returns A query string that can be appended to a URL.
 */
export function createQueryParams<T>(params: T): string {
  return qs.stringify(params, { addQueryPrefix: true }); // Automatically adds `?` at the beginning
}
