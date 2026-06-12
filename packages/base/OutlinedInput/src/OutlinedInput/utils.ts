export const getRows = (rows: number | string | undefined) => {
  // `Number(undefined)` is `NaN` (and `typeof NaN === 'number'`), so the prior
  // guard let `NaN` through. `react-textarea-autosize` only treats `undefined`
  // as "no row constraint" — a `NaN` min/maxRows yields a `NaN` height that
  // never settles (it re-applies every layout effect). Coerce to `undefined`.
  const parsed = Number(rows)

  return Number.isNaN(parsed) ? undefined : parsed
}
