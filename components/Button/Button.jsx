import React from 'react'
import PropTypes from 'prop-types'

import { Button as FButton } from '../../src/mui'
import { withStyles } from '../../src/utils/jss'
import styles from './styles'

const Button = props => {
  const { icon, children, classes, ...rest } = props
  const finalChildren = [children]

  if (icon) {
    const iconComponent = React.cloneElement(icon, { className: classes.icon })

    finalChildren.unshift(iconComponent)
  }

  return <FButton {...rest}>{finalChildren}</FButton>
}

Button.propTypes = {
  icon: PropTypes.node
}

Button.defaultProps = {
  icon: null
}

export default withStyles(styles.Button)(Button)
