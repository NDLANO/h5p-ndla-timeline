export const isDefined = <Type>(
  value: Type | null | undefined,
): value is Type => value != null;
