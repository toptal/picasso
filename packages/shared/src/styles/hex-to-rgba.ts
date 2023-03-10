const hexToRgba = (hexWithHash: string, opacity: number): string => {
  const hex = hexWithHash.replace('#', '')

  const red = parseInt(hex.substring(0, 2), 16)
  const green = parseInt(hex.substring(2, 4), 16)
  const blue = parseInt(hex.substring(4, 6), 16)

  return `rgba(${red}, ${green}, ${blue}, ${opacity})`
}

export default hexToRgba
