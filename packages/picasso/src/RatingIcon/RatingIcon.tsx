import React, { forwardRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import { Star16, StarSolid16 } from '../Icon'
import styles from './styles'
export interface Props {
  active: boolean
  interactive: boolean
}

const useStyles = makeStyles(styles, {
  name: 'PicassoRatingIcon'
})

const RatingIcon = forwardRef<HTMLDivElement, Props>(function RatingIcon(
  props,
  ref
) {
  const { active, interactive, ...rest } = props
  const classes = useStyles()

  const iconColor = 'yellow'
  const iconClasses = cx({ [classes.clickableIcon]: interactive })

  return (
    <span {...rest} ref={ref}>
      {active ? (
        <StarSolid16 color={iconColor} className={iconClasses} />
      ) : (
        <Star16 color={iconColor} className={iconClasses} />
      )}
    </span>
  )
})

RatingIcon.defaultProps = {
  interactive: true
}

RatingIcon.displayName = 'RatingIcon'

export default RatingIcon
