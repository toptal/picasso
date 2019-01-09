import React from 'react'
import PropTypes from 'prop-types'
import MUIButton from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

const Button = props => {
  const { icon, children, classes, ...rest } = props
  const finalChildren = [children]

  if (icon) {
    const iconComponent = React.cloneElement(icon, { className: classes.icon })

    finalChildren.unshift(iconComponent)
  }

  return <MUIButton {...rest}>{finalChildren}</MUIButton>
}

Button.propTypes = {
  icon: PropTypes.node
}

Button.defaultProps = {
  icon: null
}

export default withStyles(styles.Button)(Button)
