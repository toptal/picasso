export type CheckOverlapProps = {
  firstLabelRect: DOMRect
  secondLabelRect: DOMRect
  isPartiallyOverlaped: boolean
}

/**
 * if we have range slider, there is a chance
 * when we select values next to each other
 * that the lables might overlap each other. Like this example:
 * [   [ ]   ]
 *    A   B
 *
 * In that case we need to reposition the labels to the edges of the thumb:
 * [  ]   [  ]
 *    A  B
 *
 * This function checks and returns if the labels overlap.
 * It is called on each render of the component and everytime the Slider changes value.
 **/
export const checkOverlap = ({
  firstLabelRect,
  secondLabelRect,
  isPartiallyOverlaped,
}: CheckOverlapProps) => {
  const gap = 16
  const halfWidth1 = firstLabelRect.width / 2
  const halfWidth2 = secondLabelRect.width / 2

  // If there is an overlap already, in next rerender
  // we need add half of the width to simulate center position
  // to check if it would still overlapping
  const rightBoundaryOfFirstLabel = isPartiallyOverlaped
    ? firstLabelRect.right + halfWidth1
    : firstLabelRect.right
  const leftBoundaryOfSecondLabel = isPartiallyOverlaped
    ? secondLabelRect.left - halfWidth2
    : secondLabelRect.left

  return rightBoundaryOfFirstLabel + gap > leftBoundaryOfSecondLabel
}
