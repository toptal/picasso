import React, { FC } from 'react'
import { Star16, StarSolid16, Container } from '@toptal/picasso'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import styles from './styles'

export interface Props {
  active: boolean
  interactive: boolean
}

const useStyles = makeStyles(styles, {
  name: 'PicassoRatingIcon'
})

const RatingIcon: FC<Props> = ({ active, interactive }) => {
  const classes = useStyles()

  const iconColor = 'yellow'
  const iconClasses = cx({ [classes.clickableIcon]: interactive })

  return active ? (
    <Container as='span' data-testid='active-rating-icon'>
      <StarSolid16 color={iconColor} className={iconClasses} />
    </Container>
  ) : (
    <Container as='span' data-testid='inactive-rating-icon'>
      <Star16 color={iconColor} className={iconClasses} />
    </Container>
  )
}

RatingIcon.defaultProps = {
  interactive: true
}

RatingIcon.displayName = 'PicassoRatingIcon'

export default RatingIcon
