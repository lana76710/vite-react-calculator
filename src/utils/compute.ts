import { Operation, CalcResult } from '../types/calculator'

export function compute(a: number, b: number, op: Operation): CalcResult {
  if (op === '/' && b === 0) {
    return { value: null, error: 'Nije moguće deliti sa nulom.' }
  }

  const results: Record<Operation, number> = {
    '+': a + b,
    '-': a - b,
    '*': a * b,
    '/': a / b,
  }

  return { value: results[op], error: null }
}
