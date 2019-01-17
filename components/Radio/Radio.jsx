import React from 'react'
import cx from 'classnames'

import { Radio as FRadio } from '../../src/mui'
import { withStyles } from '../../src/utils/jss'
import styles from './styles'

const FallbackIcon = () => null

const Radio = props => {
  const { classes: { root, icon, ...otherClasses } } = props

  return (
    <FRadio
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
