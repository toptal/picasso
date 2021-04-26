type DataItem = { [key: string]: number | undefined }

const getDataItemMaxValue = (dataItem: DataItem) =>
  Math.max(...(Object.values(dataItem).filter(Boolean) as number[]))

const getDataMaxValue = (data: DataItem[]) =>
  data.reduce(
    (acc, dataItem) => Math.max(acc, getDataItemMaxValue(dataItem)),
    0
  )

const findTopDomain = (data: DataItem[]) => {
  const maxValue = getDataMaxValue(data)
  const base10 = Math.floor(Math.log10(maxValue))
  const roundedMaxValue = Math.pow(10, base10)
  const topDomain = roundedMaxValue * Math.ceil(maxValue / roundedMaxValue)

  return Math.max(topDomain, 10)
}

export default findTopDomain
