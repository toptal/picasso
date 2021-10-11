/**
 * Returns the new index in the list, in a circular way. If next value is out of bonds from the total,
 * it will wrap to either 0 or itemCount - 1.
 *
 * @param {number} moveAmount Number of positions to move. Negative to move backwards, positive forwards.
 * @param {number} initialIndex The initial position to move from.
 * @param {number} itemCount The total number of items.
 * @returns {number} The new index after the move.
 */
// eslint-disable-next-line complexity
const getNextWrappingIndex = (
  moveAmount: number,
  initialIndex: number | null,
  itemIndexes: number[]
) => {
  if (initialIndex === null) {
    return itemIndexes[0]
  }

  const itemsLastIndex = itemIndexes.length - 1
  let itemIndex = itemIndexes.indexOf(initialIndex)

  if (
    typeof itemIndex !== 'number' ||
    itemIndex < 0 ||
    itemIndex >= itemIndexes.length
  ) {
    itemIndex = moveAmount > 0 ? -1 : 1
  }

  const newIndex = itemIndex + moveAmount

  if (newIndex < 0) {
    return itemIndexes[itemsLastIndex]
  }

  if (newIndex > itemsLastIndex) {
    return itemIndexes[0]
  }

  return itemIndexes[newIndex]
}

export default getNextWrappingIndex
