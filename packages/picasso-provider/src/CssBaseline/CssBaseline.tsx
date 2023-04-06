import React from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import type { CssBaselineProps } from '@material-ui/core/CssBaseline'

import styles from './styles'

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoCssBaseline',
})

const CssBaseline = ({ children }: CssBaselineProps) => {
  useStyles()

  return <>{children}</>
}

export default CssBaseline
