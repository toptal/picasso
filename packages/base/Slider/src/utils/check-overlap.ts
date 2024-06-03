export type CheckOverlapProps = {
  firstLabelRect: DOMRect
  secondLabelRect: DOMRect
  previousResult: boolean
}

/**
 * if we have range slider, there is a chance
 * when we select values next to each other
 * that the lables might overlap each other. Like this example:
 * [   [ ]   ]
 *    A   B
 *
 * In that case we need to reposition the labels to the edges of the thumb.
 * [  ]   [  ]
 *    A  B
 *
 * In next rerender when we recalculate the position of the labels the
 * above example would end with result as not overlapping as the position was already changed.
 * So we need to work with the previous result of this function `previousResult`. When
 * true we need to add half of the width of the label to simulate the center position.
 *
 * This function checks and returns if the labels overlap.
 * It is called on each render of the component and everytime the Slider changes value.
 **/
export const checkOverlap = ({
  firstLabelRect,
  secondLabelRect,
  previousResult,
}: CheckOverlapProps): boolean => {
  const gap = 16
  const halfWidth1 = firstLabelRect.width / 2
  const halfWidth2 = secondLabelRect.width / 2

  const rightBoundaryOfFirstLabel = previousResult
    ? firstLabelRect.right + halfWidth1
    : firstLabelRect.right
  const leftBoundaryOfSecondLabel = previousResult
    ? secondLabelRect.left - halfWidth2
    : secondLabelRect.left

  return rightBoundaryOfFirstLabel + gap > leftBoundaryOfSecondLabel
}
