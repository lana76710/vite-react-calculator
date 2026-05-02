export type Operation = '+' | '-' | '*' | '/'

export interface CalcResult {
  value: number | null
  error: string | null
}
