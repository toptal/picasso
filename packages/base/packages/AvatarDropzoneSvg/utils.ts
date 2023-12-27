/* eslint-disable import/no-extraneous-dependencies */
/**
 * Returns the shape of the Avatar component in SVG path's format.
 * SVG's "path" works for the function like this:
 * M x1 y1 => move to point (x1,y1) (startPoint)
 * H x2 => horizontal line from (x1,y1) to (x2,y1) (topEdgeLength)
 * V y2 => vertical line from (x2,y1) to (x2,y2) (rightEdgeLength)
 * H x3 => horizontal line from (x2,y2) to (x3,y2) (bottomEdgeStartPoint)
 * L x1 y3 => line from (x1,y3) to (x3,y2) (leftCornerEndPoint)
 * Z - draw path back to starting point (x1 y1)
 *
 *   x1,y1 ----------------- x2,y1
 *     |                       |
 *     |                       |
 *     |                       |
 *     |                       |
 *     |                       |
 *   x1,y3                     |
 *      \                      |
 *       \                     |
 *       x3,y2-------------- x2,y2
 *
 */
const getAvatarShape = ({
  bottomEdgeStartPoint,
  startPoint,
  leftCornerEndPoint,
  rightEdgeLength,
  topEdgeLength,
  drawBackToStart,
}: {
  startPoint: number
  topEdgeLength: number
  rightEdgeLength: number
  bottomEdgeStartPoint: number
  leftCornerEndPoint: number
  drawBackToStart: boolean
}) => {
  return `
    M ${startPoint} ${startPoint}
    H ${topEdgeLength} 
    V ${rightEdgeLength} 
    H ${bottomEdgeStartPoint} 
    L ${startPoint} ${leftCornerEndPoint}${drawBackToStart ? ' Z' : ''}
  `
}

/**
 * Returns the shape of the background of the avatar.
 */
export const getBackgroundShape = (dimensions: number, cornerSize: number) => {
  const centerShift = 3 // shift for the outline stroke

  return getAvatarShape({
    startPoint: centerShift,
    topEdgeLength: dimensions + centerShift,
    rightEdgeLength: dimensions + centerShift,
    bottomEdgeStartPoint: cornerSize + centerShift,
    leftCornerEndPoint: dimensions - cornerSize + centerShift,
    drawBackToStart: false,
  })
}

/**
 * Returns the shape of the outline when field is focused.
 * it is 2px bigger than the background because of the outline stroke width.
 */
export const getOutlineShape = (dimensions: number, cornerSize: number) => {
  const centerShift = 2 // shift for the outline stroke
  const outlineStrokeWidth = 2 // width of the outline stroke

  return getAvatarShape({
    startPoint: centerShift,
    topEdgeLength: dimensions + centerShift + outlineStrokeWidth,
    rightEdgeLength: dimensions + centerShift + outlineStrokeWidth,
    bottomEdgeStartPoint: cornerSize + centerShift,
    leftCornerEndPoint:
      dimensions - cornerSize + centerShift + outlineStrokeWidth, // fine tuning for the outline stroke
    drawBackToStart: true,
  })
}

/**
 * Returns the shape of the borders.
 * it is 2px smaller than the background because of the border stroke width.
 */
export const getBordersShape = (dimensions: number, cornerSize: number) => {
  const centerShift = 4 // shift for the outline stroke and border stroke
  const outlineStrokeWidth = 2 // width of the outline stroke

  return getAvatarShape({
    startPoint: centerShift,
    topEdgeLength: dimensions + outlineStrokeWidth,
    rightEdgeLength: dimensions + outlineStrokeWidth,
    bottomEdgeStartPoint: cornerSize + outlineStrokeWidth + 1, // fine tuning for the border stroke
    leftCornerEndPoint: dimensions - cornerSize + outlineStrokeWidth + 1, // fine tuning for the border stroke
    drawBackToStart: true,
  })
}

export const getShapes = ({
  dimensions,
  cornerSize,
}: {
  dimensions: number
  cornerSize: number
}) => {
  return {
    background: getBackgroundShape(dimensions, cornerSize),
    outline: getOutlineShape(dimensions, cornerSize),
    borders: getBordersShape(dimensions, cornerSize),
  }
}
