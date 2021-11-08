import React, { forwardRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import { Star16, StarSolid16, Star24, StarSolid24 } from '../Icon'
import { RatingSize } from '../Rating/Rating'
import styles from './styles'

export interface Props {
  active: boolean
  interactive: boolean
  size: RatingSize
}

const useStyles = makeStyles(styles, {
  name: 'PicassoRatingIcon'
})

const ratingSizeToStarIcons = {
  small: [Star16, StarSolid16],
  large: [Star24, StarSolid24]
}

const RatingIcon = forwardRef<HTMLDivElement, Props>(function RatingIcon(
  props,
  ref
) {
  const { active, interactive, size, ...rest } = props
  const classes = useStyles()

  const iconColor = 'yellow'
  const iconClasses = cx({ [classes.clickableIcon]: interactive })
  const [Icon, IconSolid] =
    ratingSizeToStarIcons[size] || ratingSizeToStarIcons.small

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
  interactive: true
}

RatingIcon.displayName = 'RatingIcon'

export default RatingIcon
