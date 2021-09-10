interface Args {
  activePage: number
  totalPages: number
  siblingCount: number
}

const hasEllipses = ({
  activePage,
  totalPages,
  siblingCount
}: Args): [boolean, boolean] => {
  const rightmostSibling = activePage + siblingCount
  const leftmostSibling = activePage - siblingCount

  return [leftmostSibling > 1, rightmostSibling < totalPages - 1]
}

export default hasEllipses
