type DataItem = { [key: string]: any }

const getDataItemMaxValue = (dataItem: DataItem) =>
  Math.max(...Object.values(dataItem))

const getDataMaxValue = (data: DataItem[]) =>
  data.reduce(
    (acc, dataItem) => Math.max(acc, getDataItemMaxValue(dataItem)),
    0
  )

const aggregateStackedBarsWithData = (
  data: DataItem[],
  stackedBars: string[][]
) => {
  return data.map((dataItem: DataItem) => {
    const stackedBarValues = stackedBars.map(bars =>
      bars.reduce((acc, dataKey) => acc + dataItem[dataKey], 0)
    )

    const stackedBarMap = new Map(
      stackedBarValues.map((value, index) => [`stack${index}`, value])
    )

    return {
      ...dataItem,
      ...Object.fromEntries(stackedBarMap),
    }
  })
}

/**
 * Determines the absolute maximum value of the data set (does not necessary match the highest value).
 * This is later used as the upper boundary of the range for which the ticks are calculated.
 */
const findTopDomain = (data: DataItem[], stackedBars?: string[][]) => {
  const maxValue = getDataMaxValue(
    stackedBars ? aggregateStackedBarsWithData(data, stackedBars) : data
  )
  const base10 = Math.floor(Math.log10(maxValue))
  const roundedMaxValue = Math.pow(10, base10)
  const topDomain = roundedMaxValue * Math.ceil(maxValue / roundedMaxValue)

  return Math.max(topDomain || 0, 10)
}

export default findTopDomain
