export const FIRST_PAGE = 1
export const ONE_PAGE = 1
export const MORE = '+'

const getAddedSiblingsCount = (actualSiblingCount, siblingCount) => {
  let addedSiblingsCount = actualSiblingCount
  let hasMoreSiblings = false

  if (actualSiblingCount >= siblingCount) {
    addedSiblingsCount = siblingCount
    hasMoreSiblings = true
  }

  return [addedSiblingsCount, hasMoreSiblings]
}

export const getRange = ({ activePage, totalPages, siblingCount }) => {
  let pagesCount = ONE_PAGE
  let hasMorePreviousSiblings = false
  let hasMoreNextSiblings = false

  let hasPreviousSiblings = activePage !== FIRST_PAGE
  let hasNextSiblings = activePage !== totalPages
  let previousSiblingsCount = 0
  let nextSiblingsCount = 0

  if (hasPreviousSiblings) {
    let actualSiblingCount = activePage - ONE_PAGE;

    [previousSiblingsCount, hasMorePreviousSiblings] = getAddedSiblingsCount(actualSiblingCount, siblingCount)

    pagesCount = pagesCount + previousSiblingsCount

    if (hasMorePreviousSiblings) {
      pagesCount = pagesCount + ONE_PAGE
    }
  }

  if (hasNextSiblings) {
    let actualSiblingCount = totalPages - activePage;

    [nextSiblingsCount, hasMoreNextSiblings] = getAddedSiblingsCount(actualSiblingCount, siblingCount)

    pagesCount = pagesCount + nextSiblingsCount

    if (hasMoreNextSiblings) {
      pagesCount = pagesCount + ONE_PAGE
    }
  }

  const range = Array(pagesCount).fill()
  const lastIndex = range.length - 1

  return range.map((_, index) => {
    const previousModifier = hasMorePreviousSiblings ? 1 : 0
    const nextModifier = hasMorePreviousSiblings ? 1 : 0

    if (hasMorePreviousSiblings && index === 0) {
      return MORE
    }

    if (hasMoreNextSiblings && index === lastIndex) {
      return MORE
    }

    if (index < (previousSiblingsCount + previousModifier)) {
      return activePage - previousSiblingsCount + index - previousModifier
    }

    if (index > (previousSiblingsCount + nextModifier)) {
      return activePage + index - previousSiblingsCount - nextModifier
    }

    return activePage
  })
}
