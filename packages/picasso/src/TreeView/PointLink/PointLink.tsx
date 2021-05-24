import React, { FC, useMemo } from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'

import { DynamicPointLink } from '../types'
import { VERTICAL_MARGIN } from '../variables'
import styles from './styles'

export interface Props {
  link: DynamicPointLink
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoPointLink' })

export const PointLink: FC<Props> = props => {
  const { link } = props
  const classes = useStyles()
  const path = useMemo(() => {
    const { source, target } = link
    const sourceY = source.y + (source.rect?.height || 0)

    return `M${source.x}, ${sourceY}
            V${sourceY + VERTICAL_MARGIN / 2}
            H${target.x}
            V${target.y}`
  }, [link])

  return <path d={path} className={classes.pointLink} />
}

PointLink.displayName = 'PointLink'

export default PointLink
