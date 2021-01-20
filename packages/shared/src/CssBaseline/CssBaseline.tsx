import React, { FunctionComponent } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { CssBaselineProps } from '@material-ui/core/CssBaseline'

import styles from './styles'

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoCssBaseline'
})

const CssBaseline: FunctionComponent<CssBaselineProps> = ({ children }) => {
  useStyles()

  return <>{children}</>
}

export default CssBaseline
