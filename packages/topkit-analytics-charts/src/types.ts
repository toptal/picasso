export type ChartGranularity = 'month' | 'week' | 'day' | 'hour'
export type Point = {
  id: string
  values: Record<string, number | null>
}

export type Highlight = {
  data: string[]
  color: string
}

export type ReferenceLine = {
  data: Record<string, number>
  color: string
}
