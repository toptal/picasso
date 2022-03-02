import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { CssBaselineProps } from '@material-ui/core/CssBaseline'

import styles from './styles'

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoCssBaseline'
})

const CssBaseline = ({ children }: CssBaselineProps) => {
  useStyles()

  return <>{children}</>
}

export default CssBaseline
