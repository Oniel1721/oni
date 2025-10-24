export function decimals(n: number) {
  return (n.toString().split(".")[1] || "").length;
}

function _operate(
  a: number,
  b: number,
  operation: "+" | "-" | "*" | "/"
): number {
  const f = 10 ** Math.max(decimals(a), decimals(b));
  let result: number;
  switch (operation) {
    case "-":
      result = (Math.round(a * f) - Math.round(b * f)) / f;
      break;
    case "+":
      result = (Math.round(a * f) + Math.round(b * f)) / f;
      break;
    case "*":
      result = (Math.round(a * f) * Math.round(b * f)) / f;
      break;
    case "/":
      result = Math.round(a * f) / Math.round(b * f) / f;
      break;
  }
  return result;
}

export function even(n: number) {
  return n % 2 === 0;
}

export function odd(n: number) {
  return n % 2 === 1;
}

export function mean(...numbers: number[]) {
  if (!numbers.length) return NaN;
  return div(add(...numbers), numbers.length);
}

export function median(...numbers: number[]) {
  if (!numbers.length) return NaN;
  const sorted = sort(...numbers);
  const half = int(sorted.length / 2);
  if (odd(sorted.length)) {
    return sorted[half];
  }
  return mean(sorted[half], sorted[half + 1]);
}

export function range(...numbers: number[]) {
  const sorted = sort(...numbers);
  return sub(sorted[sorted.length - 1], sorted[0]);
}

export function sort(...numbers: number[]) {
  return numbers.sort((a, b) => a - b);
}

export function sortDesc(...numbers: number[]) {
  return numbers.sort((a, b) => b - a);
}

export function min(...numbers: number[]) {
  return numbers.reduce((a, n) => (n < a ? n : a), numbers[0]);
}

export function max(...numbers: number[]) {
  return numbers.reduce((a, n) => (n > a ? n : a), numbers[0]);
}

export function add(...numbers: number[]) {
  const [a, ...ns] = numbers;
  return ns.reduce((a, n) => _operate(a, n, "+"), a);
}

export function sub(...numbers: number[]) {
  const [a, ...ns] = numbers;
  return ns.reduce((a, n) => _operate(a, n, "-"), a);
}

export function mul(...numbers: number[]) {
  const [a, ...ns] = numbers;
  return ns.reduce((a, n) => _operate(a, n, "*"), a);
}

export function div(...numbers: number[]) {
  const [a, ...ns] = numbers;
  return ns.reduce((a, n) => _operate(a, n, "/"), a);
}

export function ceil(n: number) {
  const result = int(n);
  const add = decimals(n) ? 1 : 0;
  return result + add;
}

export function floor(n: number) {
  return int(n);
}

export function round(n: number, precision: number = 3) {
  return Number(n.toPrecision(precision));
}

export function int(v: string | number) {
  return parseInt(typeof v === "string" ? v : String(v), 10);
}

export const PI = 3.141592653589793;
export const E = 2.718281828459045;
