import React from 'react'
import type { ReactNode } from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  default: {
    maxWidth: 24,
    height: 24,
    verticalAlign: 'bottom',
  },
})

const Emoji = (props: { children?: ReactNode }) => {
  const classes = useStyles()

  return <img className={classes.default} {...props} />
}

export default Emoji
