import getSiblings from '../get-siblings'
import hasEllipses from '../has-ellipsises'

interface Args {
  activePage: number
  siblingCount: number
  totalPages: number
}

export const ELLIPSIS = '...'

const getRange = ({ activePage, siblingCount, totalPages }: Args) => {
  if (totalPages <= 3) {
    return Array.from({ length: totalPages }).map((_, index) => index + 1)
  }

  const [leftSiblings, rightSiblings] = getSiblings({
    activePage,
    siblingCount,
    totalPages
  })
  const [hasLeftEllipses, hasRightEllipses] = hasEllipses({
    activePage,
    siblingCount,
    totalPages
  })

  const rightRange = [
    ...rightSiblings,
    ...(hasRightEllipses ? [ELLIPSIS] : []),
    totalPages
  ]
  const leftRange = [1, ...(hasLeftEllipses ? [ELLIPSIS] : []), ...leftSiblings]

  if (activePage === 1) {
    return [activePage, ...rightRange]
  }

  if (activePage === totalPages) {
    return [...leftRange, activePage]
  }

  return [...leftRange, activePage, ...rightRange]
}

export default getRange
