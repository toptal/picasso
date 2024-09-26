import React, { useMemo } from 'react'

import type { DirectionsType, DynamicPointLink } from '../types'

export interface Props {
  link: DynamicPointLink
  direction: DirectionsType
  verticalMargin: number
  horizontalMargin: number
}

export const PointLink = (props: Props) => {
  const { link, direction, verticalMargin, horizontalMargin } = props
  const path = useMemo(() => {
    const { source, target } = link
    const sourceYDeltas = {
      horizontal: source.rect?.height / 2 || 0,
      vertical: source.rect?.height || 0,
    }
    const sourceXDeltas = {
      horizontal: source.rect?.width || 0,
      vertical: source.rect?.width / 2 || 0,
    }
    const sourceY = source.y + sourceYDeltas[direction]
    const sourceX = source.x + sourceXDeltas[direction]

    const svgPaths = {
      horizontal: `M${sourceX}, ${sourceY}
        H${sourceX + horizontalMargin / 2}
        V${target.y + (target.rect?.height ?? 0) / 2}
        H${target.x}`,
      vertical: `M${sourceX}, ${sourceY}
        V${sourceY + verticalMargin / 2}
        H${target.x + (target.rect?.width ?? 0) / 2}
        V${target.y}`,
    }

    return svgPaths[direction]
  }, [link, direction, verticalMargin, horizontalMargin])

  return <path d={path} className='fill-none stroke-gray-400' />
}

PointLink.displayName = 'PointLink'

export default PointLink
