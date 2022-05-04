import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

import styles from '../Tag/styles'
import Typography from '../Typography/Typography'
import Link16 from '../Icon/Link16'

export type Props = {
  /**
   * renders number of connections
   */
  children: string
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoLabel' })

const TagConnection = ({ children }: Props) => {
  const classes = useStyles()

  return (
    <Typography
      className={classes.connection}
      color='inherit'
      as='span'
      size='xsmall'
    >
      <Link16 />
      {children}
    </Typography>
  )
}

export default TagConnection
