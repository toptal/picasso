export const FIRST_PAGE = 1
export const ONE_PAGE = 1
export const ELLIPSIS = '...'

type SibilingsType = (number | string)[]

const addEllipsis = (siblings: SibilingsType, page: number) => {
  const lastSibling = siblings[siblings.length - 1]

  if (lastSibling && lastSibling !== page) {
    siblings.push(ELLIPSIS)
  }
}

const getPreviousSiblings = (activePage: number, siblingCount: number) => {
  const previousSiblings = [] as SibilingsType
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

const getNextSiblings = (
  activePage: number,
  siblingCount: number,
  totalPages: number
) => {
  const nextSiblings = [] as SibilingsType
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

export const getRange = (
  activePage: number,
  totalPages: number,
  siblingCount: number
) => {
  const previousSiblings = getPreviousSiblings(activePage, siblingCount)
  const nextSiblings = getNextSiblings(activePage, siblingCount, totalPages)

  return [...previousSiblings, activePage, ...nextSiblings]
}
