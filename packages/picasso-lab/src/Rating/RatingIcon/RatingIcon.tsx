import React, { FC } from 'react'
import { Star16, StarSolid16 } from '@toptal/picasso'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import styles from './styles'

export interface Props {
  active: boolean
  readOnly: boolean
}

const useStyles = makeStyles(styles, {
  name: 'PicassoRating'
})

const RatingIcon: FC<Props> = ({ active, readOnly }) => {
  const classes = useStyles()

  return active ? (
    <StarSolid16
      color='yellow'
      className={cx({ [classes.clickableIcon]: !readOnly })}
    />
  ) : (
    <Star16
      color='yellow'
      className={cx({ [classes.clickableIcon]: !readOnly })}
    />
  )
}

RatingIcon.displayName = 'RatingIcon'

export default RatingIcon
