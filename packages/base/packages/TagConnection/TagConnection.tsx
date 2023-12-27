/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import { Link16 } from '@toptal/picasso-icon'
import Typography from '@toptal/picasso-typography'
import styles from '@toptal/picasso-tag/styles'

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
