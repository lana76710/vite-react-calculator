import { useState } from 'react'
import { Operation, CalcResult } from '../../types/calculator'
import { compute } from '../../utils/compute'
import { formatResult } from '../../utils/format'
import './Calculator.css'

const OPERATIONS: { symbol: Operation; label: string }[] = [
  { symbol: '+', label: 'Saberi' },
  { symbol: '-', label: 'Oduzmi' },
  { symbol: '*', label: 'Pomnoži' },
  { symbol: '/', label: 'Podeli' },
]

export default function Calculator() {
  const [broj1, setBroj1] = useState<string>('')
  const [broj2, setBroj2] = useState<string>('')
  const [rezultat, setRezultat] = useState<CalcResult | null>(null)
  const [aktivnaOp, setAktivnaOp] = useState<Operation | null>(null)

  const handleOperation = (op: Operation) => {
    const a = parseFloat(broj1)
    const b = parseFloat(broj2)

    setAktivnaOp(op)

    if (isNaN(a) || isNaN(b)) {
      setRezultat({ value: null, error: 'Unesite validne brojeve u oba polja.' })
      return
    }

    setRezultat(compute(a, b, op))
  }

  const handleReset = () => {
    setBroj1('')
    setBroj2('')
    setRezultat(null)
    setAktivnaOp(null)
  }

  return (
    <div className="calc-wrapper">
      <h1 className="calc-title">Kalkulator</h1>

      <div className="input-row">
        <label htmlFor="broj1">Broj 1</label>
        <input
          id="broj1"
          type="number"
          placeholder="npr. 10"
          value={broj1}
          onChange={(e) => { setBroj1(e.target.value); setRezultat(null); setAktivnaOp(null) }}
        />
      </div>

      <div className="input-row">
        <label htmlFor="broj2">Broj 2</label>
        <input
          id="broj2"
          type="number"
          placeholder="npr. 5"
          value={broj2}
          onChange={(e) => { setBroj2(e.target.value); setRezultat(null); setAktivnaOp(null) }}
        />
      </div>

      <div className="btn-grid">
        {OPERATIONS.map((op) => (
          <button
            key={op.symbol}
            className={`btn-op ${aktivnaOp === op.symbol ? 'selected' : ''}`}
            onClick={() => handleOperation(op.symbol)}
          >
            <span className="btn-symbol">{op.symbol}</span>
            <span className="btn-name">{op.label}</span>
          </button>
        ))}
      </div>

      {rezultat !== null && (
        <div className={`result-area ${rezultat.error ? 'err' : 'ok'}`}>
          {rezultat.error ? (
            <p>{rezultat.error}</p>
          ) : (
            <p>= {formatResult(rezultat.value!)}</p>
          )}
        </div>
      )}

      <button className="btn-reset" onClick={handleReset}>
        Resetuj
      </button>
    </div>
  )
}
