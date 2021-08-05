import React, { FC, useMemo } from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'

import { DirectionsType, DynamicPointLink } from '../types'
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../variables'
import styles from './styles'

export interface Props {
  link: DynamicPointLink
  direction: DirectionsType
  verticalMargin: number
  horizontalMargin: number
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoPointLink' })

export const PointLink: FC<Props> = props => {
  const { link, direction, verticalMargin, horizontalMargin } = props
  const classes = useStyles()
  const path = useMemo(() => {
    const { source, target } = link
    const sourceY =
      source.y +
      (direction === 'horizontal'
        ? source.rect?.height / 2
        : source.rect?.height || 0)
    const sourceX = source.x + (source.rect?.width / 2 || 0)

    return direction === 'horizontal'
      ? `M${sourceX}, ${sourceY}
            H${sourceX + horizontalMargin / 2}
            V${target.y + DEFAULT_HEIGHT / 2}
            H${target.x - DEFAULT_WIDTH / 2}`
      : `M${source.x}, ${sourceY}
               V${sourceY + verticalMargin / 2}
               H${target.x}
               V${target.y}`
  }, [link, direction, verticalMargin])

  return <path d={path} className={classes.pointLink} />
}

PointLink.displayName = 'PointLink'

export default PointLink
