import React from 'react'
import type { ReactNode } from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  default: {
    maxWidth: '100%',
  },
})

const Image = (props: { children?: ReactNode }) => {
  const classes = useStyles()

  return <img className={classes.default} {...props} />
}

export default Image
