export const FIRST_PAGE = 1
export const ONE_PAGE = 1
export const ELLIPSIS = '...'

export type SibilingsType = (number | string)[]

const getEllipsis = (siblings: number[], targetPage: number) => {
  const lastSibling = siblings[siblings.length - 1]

  if (!lastSibling) {
    return []
  }

  // we only want to add ellipsis if relative difference
  // between sibling and target page is more then one page
  // otherwise they are neighbours
  const relativeDiff = Math.abs(lastSibling - targetPage)

  if (lastSibling && relativeDiff > ONE_PAGE) {
    return [ELLIPSIS]
  }

  return []
}

const getPreviousSiblings = (activePage: number, siblingCount: number) => {
  const previousSiblings: number[] = []
  const lastSibling = activePage - siblingCount

  for (
    let pageNumber = activePage - ONE_PAGE;
    pageNumber >= lastSibling && pageNumber >= FIRST_PAGE;
    pageNumber--
  ) {
    previousSiblings.push(pageNumber)
  }

  const ellipsis = getEllipsis(previousSiblings, FIRST_PAGE)

  return [...ellipsis, ...previousSiblings.reverse()] as SibilingsType
}

const getNextSiblings = (
  activePage: number,
  siblingCount: number,
  totalPages: number
) => {
  const nextSiblings = [] as number[]
  const lastSibling = activePage + siblingCount

  for (
    let pageNumber = activePage + ONE_PAGE;
    pageNumber <= lastSibling && pageNumber <= totalPages;
    pageNumber++
  ) {
    nextSiblings.push(pageNumber)
  }

  const ellipsis = getEllipsis(nextSiblings, totalPages)

  return [...nextSiblings, ...ellipsis] as SibilingsType
}

const getFirstPage = (activePage: number, siblingCount: number) => {
  if (activePage - siblingCount > FIRST_PAGE) {
    return [FIRST_PAGE] as SibilingsType
  }

  return [] as SibilingsType
}

const getLastPage = (
  activePage: number,
  siblingCount: number,
  totalPages: number
) => {
  if (activePage + siblingCount < totalPages) {
    return [totalPages] as SibilingsType
  }

  return [] as SibilingsType
}

export const getRange = (
  activePage: number,
  totalPages: number,
  siblingCount: number
) => {
  const previousSiblings = getPreviousSiblings(activePage, siblingCount)
  const nextSiblings = getNextSiblings(activePage, siblingCount, totalPages)

  const firstPage = getFirstPage(activePage, siblingCount)
  const lastPage = getLastPage(activePage, siblingCount, totalPages)

  return [
    ...firstPage,
    ...previousSiblings,
    activePage,
    ...nextSiblings,
    ...lastPage
  ]
}
