export type GetPositionProps = {
  rect: DOMRect
  isOverlaped: boolean
  isFirstLabel: boolean
  currentPlacement: 'left' | 'right' | 'center'
}

export const getXPlacement = ({
  rect: { width, left, right },
  isOverlaped,
  isFirstLabel,
  currentPlacement,
}: GetPositionProps): 'left' | 'right' | 'center' => {
  const gap = 16
  const halfWidth = width / 2
  const leftBoundary = currentPlacement === 'right' ? left - halfWidth : left
  const rightBoundary = currentPlacement === 'left' ? right + halfWidth : right

  if (leftBoundary < gap) {
    return 'right'
  } else if (rightBoundary > window.innerWidth - gap) {
    return 'left'
  } else if (isOverlaped) {
    return isFirstLabel ? 'left' : 'right'
  }

  return 'center'
}
