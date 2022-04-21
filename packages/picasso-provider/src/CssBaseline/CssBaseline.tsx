import React from 'react'
import { Theme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import { CssBaselineProps } from '@mui/material/CssBaseline'

import styles from './styles'

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoCssBaseline'
})

const CssBaseline = ({ children }: CssBaselineProps) => {
  useStyles()

  return <>{children}</>
}

export default CssBaseline
