interface Args {
  activePage: number
  siblingCount: number
  totalPages: number
}

const getSiblings = ({
  activePage,
  siblingCount,
  totalPages
}: Args): [number[], number[]] => {
  const rightSiblings: number[] = []
  const leftSiblings: number[] = []

  const rightmostSibling = activePage + siblingCount
  const leftmostSibling = activePage - siblingCount

  for (
    let page = activePage + 1;
    page <= rightmostSibling && page < totalPages;
    page++
  ) {
    rightSiblings.push(page)
  }

  for (let page = activePage - 1; page >= leftmostSibling && page > 1; page--) {
    leftSiblings.push(page)
  }

  leftSiblings.reverse()

  return [leftSiblings, rightSiblings]
}

export default getSiblings
