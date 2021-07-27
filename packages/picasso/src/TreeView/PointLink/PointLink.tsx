import React, { FC, useMemo } from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'

import { DynamicPointLink } from '../types'
import {
  VERTICAL_MARGIN,
  HORIZONTAL_MARGIN,
  DEFAULT_HEIGHT,
  DEFAULT_WIDTH
} from '../variables'
import styles from './styles'

export interface Props {
  link: DynamicPointLink
  isHorizontal?: boolean
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoPointLink' })

export const PointLink: FC<Props> = props => {
  const { link, isHorizontal } = props
  const classes = useStyles()
  const path = useMemo(() => {
    const { source, target } = link
    const sourceY =
      source.y +
      (isHorizontal ? source.rect?.height / 2 : source.rect?.height || 0)
    const sourceX = source.x + (source.rect?.width / 2 || 0)

    return isHorizontal
      ? `M${sourceX}, ${sourceY}
            H${sourceX + HORIZONTAL_MARGIN / 2}
            V${target.y + DEFAULT_HEIGHT / 2}
            H${target.x - DEFAULT_WIDTH / 2}`
      : `M${source.x}, ${sourceY}
               V${sourceY + VERTICAL_MARGIN / 2}
               H${target.x}
               V${target.y}`
  }, [link, isHorizontal])

  return <path d={path} className={classes.pointLink} />
}

PointLink.displayName = 'PointLink'

export default PointLink
