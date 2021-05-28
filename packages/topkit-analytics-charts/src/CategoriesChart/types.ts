type Value = {
  id: string
  value: number
}

export type Bar = {
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

export type Labels = Record<string, string>

export type Tooltips = Record<string, Record<string, Record<string, string>>>
