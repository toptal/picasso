import type { ReactNode } from 'react'
import type { Theme } from '@material-ui/core/styles'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import styles from './styles'

type Props = {
  children?: ReactNode
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoCode' })

const CodeComponent = ({ children }: Props) => {
  const classes = useStyles()

  return <code className={classes.code}>{children}</code>
}

export default CodeComponent
