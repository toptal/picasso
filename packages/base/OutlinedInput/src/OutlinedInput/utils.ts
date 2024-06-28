export const getRows = (rows: number | string | undefined) =>
  typeof Number(rows) === 'number' ? Number(rows) : undefined
