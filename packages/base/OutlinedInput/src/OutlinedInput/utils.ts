export const getRows = (rows: number | string | undefined) => {
  // Number(undefined) is NaN; react-textarea-autosize needs undefined for "no constraint"
  const parsed = Number(rows)

  return Number.isNaN(parsed) ? undefined : parsed
}
