export const FIRST_PAGE = 1
export const ONE_PAGE = 1
export const ELLIPSIS = '...'

const addEllipsis = (siblings, page) => {
  const lastSibling = siblings[siblings.length - 1]

  if (lastSibling && lastSibling !== page) {
    siblings.push(ELLIPSIS)
  }
}

const getPreviousSiblings = (activePage, siblingCount) => {
  const previousSiblings = []
  const estimatedLastSibling = activePage - siblingCount
  let pageNumber = activePage - ONE_PAGE

  for (
    ;
    pageNumber >= estimatedLastSibling && pageNumber >= FIRST_PAGE;
    pageNumber--
  ) {
    previousSiblings.push(pageNumber)
  }

  addEllipsis(previousSiblings, FIRST_PAGE)

  return previousSiblings.reverse()
}

const getNextSiblings = (activePage, siblingCount, totalPages) => {
  const nextSiblings = []
  const estimatedLastSibling = activePage + siblingCount
  let pageNumber = activePage + ONE_PAGE

  for (
    ;
    pageNumber <= estimatedLastSibling && pageNumber <= totalPages;
    pageNumber++
  ) {
    nextSiblings.push(pageNumber)
  }

  addEllipsis(nextSiblings, totalPages)

  return nextSiblings
}

export const getRange = ({ activePage, totalPages, siblingCount }) => {
  const previousSiblings = getPreviousSiblings(activePage, siblingCount)
  const nextSiblings = getNextSiblings(activePage, siblingCount, totalPages)

  return [...previousSiblings, activePage, ...nextSiblings]
}
