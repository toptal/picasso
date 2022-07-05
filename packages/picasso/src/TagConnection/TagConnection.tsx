import React from 'react'
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';

import { Link16 } from '../Icon'
import Typography from '../Typography'
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
