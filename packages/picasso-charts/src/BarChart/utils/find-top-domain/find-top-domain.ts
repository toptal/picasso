type DataItem = { [key: string]: number }

const getDataItemMaxValue = (dataItem: DataItem) =>
  Object.values(dataItem).reduce((acc, value) => Math.max(acc, value), 0)

const getDataMaxValue = (data: DataItem[]) =>
  data.reduce(
    (acc, dataItem) => Math.max(acc, getDataItemMaxValue(dataItem)),
    0
  )

const findTopDomain = (data: DataItem[]) => {
  const maxValue = getDataMaxValue(data)
  const base10 = Math.ceil(Math.log10(maxValue))
  const roundedMaxValue = Math.pow(10, base10)
  const topDomain = roundedMaxValue * Math.ceil(maxValue / roundedMaxValue)

  return Math.max(topDomain, 10)
}

export default findTopDomain
