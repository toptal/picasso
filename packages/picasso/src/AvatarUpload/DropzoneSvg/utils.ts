/**
 * Returns the shape of the background of the avatar.
 * it should be 80x80(px)
 */
export const getBackgroundShape = (dimensions: number, cornerSize: number) => {
  const centerShift = 3 // shift for the outline stroke

  return `
    M ${centerShift} ${centerShift}
    H ${dimensions + centerShift} 
    V ${dimensions + centerShift} 
    H ${cornerSize + centerShift} 
    L ${centerShift} ${dimensions - cornerSize + centerShift}
  `
}

/**
 * Returns the shape of the outline when field is focused.
 * it should be 82x82(px)
 * it is 2px bigger than the background because of the outline stroke width.
 */
export const getOutlineShape = (dimensions: number, cornerSize: number) => {
  const centerShift = 2 // shift for the outline stroke
  const outlineStrokeWidth = 2 // width of the outline stroke

  return `
    M ${centerShift} ${centerShift}
    H ${dimensions + centerShift + outlineStrokeWidth} 
    V ${dimensions + centerShift + outlineStrokeWidth} 
    H ${cornerSize + 1} 
    L ${centerShift} ${dimensions - cornerSize + centerShift} Z
  `
}

/**
 * Returns the shape of the borders.
 * it should be 78x78(px)
 * it is 1px smaller than the background because of the border stroke width.
 */
export const getBordersShape = (dimensions: number, cornerSize: number) => {
  const centerShift = 4 // shift for the outline stroke and border stroke
  const outlineStrokeWidth = 2 // width of the outline stroke

  return `
    M ${centerShift} ${centerShift}
    H ${dimensions + outlineStrokeWidth} 
    V ${dimensions + outlineStrokeWidth} 
    H ${cornerSize + outlineStrokeWidth} 
    L ${centerShift} ${dimensions - cornerSize + outlineStrokeWidth} Z
  `
}
