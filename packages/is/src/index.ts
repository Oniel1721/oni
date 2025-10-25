export function number(v: unknown): v is number {
  return typeof v === "number" && !isNaN(v);
}

export function nan(v: unknown): boolean {
  return typeof v === "number" && isNaN(v);
}

export function positive(v: number): boolean {
  return v > 0;
}

export function negative(v: number): boolean {
  return v < 0;
}

export function zero(v: number): boolean {
  return v === 0;
}

export function int(v: number): boolean {
  return String(v).indexOf(".") === -1;
}

export function odd(v: number): boolean {
  return v % 2 === 1;
}

export function even(v: number): boolean {
  return v % 2 === 0;
}

export function string(v: unknown): v is string {
  return typeof v === "string";
}

export function empty(v: { length: number }): boolean {
  return v.length === 0;
}

export function equal<T>(to: T) {
  return (v: unknown) => v === to;
}

export function len(n: number) {
  return (v: { length: number }) => v.length === n;
}

export function min(n: number) {
  return (v: number | { length: number }) => {
    if (typeof v === "number") return v >= n;
    return v.length >= n;
  };
}

export function max(n: number) {
  return (v: number | { length: number }) => {
    if (typeof v === "number") return v <= n;
    return v.length <= n;
  };
}

export function defined(v: unknown): boolean {
  return v !== undefined;
}

export function nullish(v: unknown): boolean {
  return Boolean(v ?? true);
}

type IFunction<T> = (v: T) => boolean;

type ReturnIs<T, F extends IFunction<T>> = F extends (
  v: unknown
) => v is infer V
  ? V
  : never;

export function is<T, F extends IFunction<T>, Is extends ReturnIs<T, F>>(
  v: T,
  icb: F,
  ...cbs: ((v: Is) => boolean)[]
) {
  return [icb, ...cbs].every((cb) => cb(v as unknown as T & Is));
}

export function isNot<T, F extends IFunction<T>, Is extends ReturnIs<T, F>>(
  v: T,
  icb: F,
  ...cbs: ((v: Is) => boolean)[]
) {
  return !is(v, icb, ...cbs);
}

export default {
  is,
  isNot,
  number,
  nan,
  positive,
  negative,
  zero,
  int,
  odd,
  even,
  string,
  empty,
  equal,
  len,
  min,
  max,
  defined,
  nullish,
};
