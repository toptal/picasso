export type Value = {
  id: string
  value: number
}

export type DataItem = {
  id: string
  values: [
    {
      id: string
      values: Value[]
    },
    {
      id: string
      values: Value[]
    }
  ]
}

export type LabelMap = Record<string, string>

export type TooltipMap = Record<string, Record<string, Record<string, string>>>
