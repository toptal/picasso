import React, { forwardRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import type { SizeType } from '@toptal/picasso-shared'
import { Star16, StarSolid16, Star24, StarSolid24 } from '@toptal/picasso-icons'

import styles from './styles'

export interface Props {
  active: boolean
  hovered?: boolean
  interactive: boolean
  size: SizeType<'small' | 'large'>
}

const useStyles = makeStyles(styles, {
  name: 'PicassoRatingIcon',
})

const iconsBySize = {
  small: [Star16, StarSolid16],
  large: [Star24, StarSolid24],
}

const RatingIcon = forwardRef<HTMLDivElement, Props>(function RatingIcon(
  props,
  ref
) {
  const { active, hovered, interactive, size, ...rest } = props
  const classes = useStyles()

  const iconColor = 'yellow'
  const iconClasses = cx({
    [classes.clickableIcon]: interactive,
    [classes.hovered]: hovered,
  })
  const [Icon, IconSolid] = iconsBySize[size] || iconsBySize.small

  return (
    <span {...rest} ref={ref}>
      {active ? (
        <IconSolid color={iconColor} className={iconClasses} />
      ) : (
        <Icon color={iconColor} className={iconClasses} />
      )}
    </span>
  )
})

RatingIcon.defaultProps = {
  interactive: true,
}

RatingIcon.displayName = 'RatingIcon'

export default RatingIcon
