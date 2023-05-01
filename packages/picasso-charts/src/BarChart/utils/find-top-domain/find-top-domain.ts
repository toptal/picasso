type DataItem = { [key: string]: number }

const getDataItemMaxValue = (dataItem: DataItem) =>
  Math.max(...Object.values(dataItem))

const getDataMaxValue = (data: DataItem[]) =>
  data.reduce(
    (acc, dataItem) => Math.max(acc, getDataItemMaxValue(dataItem)),
    0
  )

const aggregateStackedBars = (data: DataItem[], stackedBars: string[][]) => {
  return data.map((dataItem: DataItem) => {
    const stackedBarValues = stackedBars.map((bars: string[]) => (
      bars.reduce(
        (acc, dataKey:string) => acc + dataItem[dataKey],
        0
      ))
    )

    const stackedBarMap = new Map(stackedBarValues.map((v, index) => [`stack${index}`, v]))

    return {
      ...dataItem,
      ...Object.fromEntries(stackedBarMap),
    }
  })
}

const findTopDomain = (data: DataItem[], stackedBars?: string[][]) => {
  const maxValue = getDataMaxValue(stackedBars ? aggregateStackedBars(data, stackedBars) : data)
  const base10 = Math.floor(Math.log10(maxValue))
  const roundedMaxValue = Math.pow(10, base10)
  const topDomain = roundedMaxValue * Math.ceil(maxValue / roundedMaxValue)

  return Math.max(topDomain, 10)
}

export default findTopDomain
