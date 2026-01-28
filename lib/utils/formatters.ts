import qs from "qs";

/**
 * Converts an object to a query string using the qs library.
 * @param params - An object where the keys are query parameter names and values can be strings, numbers, arrays, or objects.
 * @returns A query string that can be appended to a URL.
 */
export function createQueryParams<T>(params: T): string {
  return qs.stringify(params, { addQueryPrefix: true }); // Automatically adds `?` at the beginning
}

export function formatCurrency(
  amount: number | null | undefined,
  currency: "USD" | "EUR" = "USD",
) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount ?? 0);
}

export function formatPluralNumber(
  value: number | null | undefined,
  label: string,
) {
  if (value == null) return `0 ${label}s`;

  const formattedNumber = new Intl.NumberFormat("en-US").format(value);
  const plural = value === 1 ? label : `${label}s`;

  return `${formattedNumber} ${plural}`;
}
