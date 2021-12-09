import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

import { Link16, Typography } from '..'
import styles from '../Tag/styles'

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
