import type { ReactNode } from 'react'
import type { Theme } from '@material-ui/core/styles'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import styles from './styles'

type Props = {
  children?: ReactNode
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoCode' })

const CodeBlockComponent = ({ children }: Props) => {
  const classes = useStyles()

  return <pre className={classes.codeBlock}>{children}</pre>
}

export default CodeBlockComponent
