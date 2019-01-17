import React from 'react'
import cx from 'classnames'
import MUIRadio from '@material-ui/core/Radio'
import { withStyles } from '@material-ui/core/styles'

import FormControlLabel from '../FormControlLabel'
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
    <FormControlLabel control={muiRadio} label={label} />
  ) : (
    muiRadio
  )
}

export default withStyles(styles.Radio)(Radio)
