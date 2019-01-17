import React from 'react'
import cx from 'classnames'
import MUIRadio from '@material-ui/core/Radio'
import MUIFormControlLabel from '@material-ui/core/FormControlLabel'
import { withStyles } from '@material-ui/core/styles'

import styles from './styles'

const FallbackIcon = () => null

const Radio = props => {
  const { classes: { root, icon, ...otherClasses }, label } = props

  const muiRadio = (
    <MUIRadio
      {...props}
      checkedIcon={<FallbackIcon />}
      classes={{
        ...otherClasses,
        root: cx(root, icon)
      }}
      icon={<FallbackIcon />}
    />
  )

  return label ? (
    <MUIFormControlLabel control={muiRadio} label={label} />
  ) : (
    muiRadio
  )
}

export default withStyles(styles.Radio)(Radio)
