export function createGetVarient<TMap extends Record<string, string>>(
  map: TMap,
  defaultVariant: TMap[keyof TMap],
) {
  type Status = keyof TMap;
  type Variant = TMap[Status];

  return function getStatusVariant(status: string | null | undefined): Variant {
    if (!status) {
      if (defaultVariant !== undefined) return defaultVariant;
      // fallback to first value in map
      return Object.values(map)[0] as Variant;
    }

    if (status in map) {
      return map[status as Status];
    }

    if (defaultVariant !== undefined) return defaultVariant;

    return Object.values(map)[0] as Variant;
  };
}
