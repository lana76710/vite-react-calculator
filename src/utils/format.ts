export function formatResult(value: number): string {
  return Number.isInteger(value)
    ? value.toString()
    : parseFloat(value.toFixed(10)).toString()
}
