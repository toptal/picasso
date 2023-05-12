const defineStackId = (dataKey: string, stackedBars: string[][]) => {
  const stackIndex = stackedBars?.find(barsList => barsList.includes(dataKey))

  if (stackIndex) {
    return `stack${stackIndex}`
  }

  return undefined
}

export default defineStackId
