import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

import { Link16, Typography } from '..'
import styles from './styles'

type TagConnectionProps = {
  /**
   * renders number of connections
   */
  children: string
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoLabel' })

const TagConnection = ({ children }: TagConnectionProps) => {
  const classes = useStyles()

  return (
    <Typography
      className={classes.connection}
      color='inherit'
      as='span'
      size='small'
    >
      <Link16 />
      {children}
    </Typography>
  )
}

export default TagConnection
