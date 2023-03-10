const hexToRgba = (hexCode: string, opacity: number): string => {
  if (opacity < 0 || opacity > 1) {
    throw new Error('Opacity must be between 0 and 1')
  }

  const isHexCodeValid = /^#([A-Fa-f0-9]{3}){1,2}$/.test(hexCode)

  if (!isHexCodeValid) {
    throw new Error(`Invalid hex code: ${hexCode}`)
  }

  let hex = hexCode.substring(1)

  // Handle shorthand hex colors (e.g. #abc -> #aabbcc)
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map(char => char + char)
      .join('')
  }

  const red = parseInt(hex.substring(0, 2), 16)
  const green = parseInt(hex.substring(2, 4), 16)
  const blue = parseInt(hex.substring(4, 6), 16)

  return `rgba(${red}, ${green}, ${blue}, ${opacity})`
}

export default hexToRgba
