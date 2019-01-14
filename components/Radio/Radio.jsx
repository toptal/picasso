import React from 'react'
import cx from 'classnames'
import MUIRadio from '@material-ui/core/Radio'
import { withStyles } from '@material-ui/core/styles'

import styles from './styles'

const FallbackIcon = () => null

const Radio = props => {
  const { classes: { root, icon, ...otherClasses } } = props

  return (
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
}

export default withStyles(styles.Radio)(Radio)
