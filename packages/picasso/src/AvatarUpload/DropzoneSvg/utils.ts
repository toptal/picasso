/**
 * Returns the shape of the Avatar component in SVG path's format.
 * SVG's "path" works for the function like this:
 * M x1 y1 - move to point x, y (start point)
 * H x2 - horizontal line to x1 (top edge)
 * V y3 - vertical line to y2 (right edge)
 * H x4 - horizontal line to x3 (bottom edge)
 * L x1 y5 - close path to point x4, y4
 * Z - draw path back to starting point (x1 y1)
 */
const getAvatarShape = ({
  bottomEdgeLength,
  startPoint,
  leftCornerPoint,
  rightEdgeLength,
  topEdgeLength,
  drawBackToStart,
}: {
  startPoint: number
  topEdgeLength: number
  rightEdgeLength: number
  bottomEdgeLength: number
  leftCornerPoint: number
  drawBackToStart: boolean
}) => {
  return `
    M ${startPoint} ${startPoint}
    H ${topEdgeLength} 
    V ${rightEdgeLength} 
    H ${bottomEdgeLength} 
    L ${startPoint} ${leftCornerPoint}${drawBackToStart ? ' Z' : ''}
  `
}

/**
 * Returns the shape of the background of the avatar.
 * For small variant, it should be 80x80(px), for large - 160x160(px).
 */
export const getBackgroundShape = ({
  dimensions,
  cornerSize,
}: {
  dimensions: number
  cornerSize: number
}) => {
  const centerShift = 3 // shift for the outline stroke

  return getAvatarShape({
    startPoint: centerShift,
    topEdgeLength: dimensions + centerShift,
    rightEdgeLength: dimensions + centerShift,
    bottomEdgeLength: cornerSize + centerShift,
    leftCornerPoint: dimensions - cornerSize + centerShift,
    drawBackToStart: false,
  })
}

/**
 * Returns the shape of the outline when field is focused.
 * For small variant, it should be 82x82(px), for large - 162x162(px).
 * it is 2px bigger than the background because of the outline stroke width.
 */
export const getOutlineShape = ({
  dimensions,
  cornerSize,
}: {
  dimensions: number
  cornerSize: number
}) => {
  const centerShift = 2 // shift for the outline stroke
  const outlineStrokeWidth = 2 // width of the outline stroke

  return getAvatarShape({
    startPoint: centerShift,
    topEdgeLength: dimensions + centerShift + outlineStrokeWidth,
    rightEdgeLength: dimensions + centerShift + outlineStrokeWidth,
    bottomEdgeLength: cornerSize + 1,
    leftCornerPoint: dimensions - cornerSize + centerShift,
    drawBackToStart: true,
  })
}

/**
 * Returns the shape of the borders.
 * For small variant, it should be 78x78(px), for large - 158x158(px).
 * it is 1px smaller than the background because of the border stroke width.
 */
export const getBordersShape = ({
  dimensions,
  cornerSize,
}: {
  dimensions: number
  cornerSize: number
}) => {
  const centerShift = 4 // shift for the outline stroke and border stroke
  const outlineStrokeWidth = 2 // width of the outline stroke

  return getAvatarShape({
    startPoint: centerShift,
    topEdgeLength: dimensions + outlineStrokeWidth,
    rightEdgeLength: dimensions + outlineStrokeWidth,
    bottomEdgeLength: cornerSize + outlineStrokeWidth,
    leftCornerPoint: dimensions - cornerSize + outlineStrokeWidth,
    drawBackToStart: true,
  })
}
