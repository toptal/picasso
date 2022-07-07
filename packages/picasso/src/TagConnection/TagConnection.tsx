import React from 'react'

import { Link16 } from '../Icon'
import Typography from '../Typography'
import useStyles from '../Tag/styles'

export type Props = {
  /**
   * renders number of connections
   */
  children: string
}

const TagConnection = ({ children }: Props) => {
  const { classes } = useStyles()

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
