export type FixedArray<
  T,
  Max extends number,
  A extends (T | undefined)[] = [],
  O extends boolean = false,
> = O extends false
  ? Max extends A['length']
    ? FixedArray<T, Max, A, true>
    : FixedArray<T, Max, [...A, T], false>
  : Max extends A['length']
  ? A
  : FixedArray<T, Max, [...A, T?], false>;
