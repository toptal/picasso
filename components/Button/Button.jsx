import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import MUIButton from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import { capitalize } from '@material-ui/core/utils/helpers'

import styles from './styles'
import Group from '../ButtonGroup'

const Button = props => {
  const { icon, children, classes, variant, color, compact, ...rest } = props
  const finalChildren = [children]

  if (icon) {
    const iconComponent = React.cloneElement(icon, { className: classes.icon })

    finalChildren.unshift(iconComponent)
  }

  const rootClassName = cx(
    {
      [classes[`${variant.toLowerCase()}Negative`]]: color === 'negative',
      [classes.compact]: compact
    },
    classes[`${variant}${capitalize(color)}`]
  )

  return (
    <MUIButton
      {...rest}
      classes={{
        root: rootClassName
      }}
      color={color === 'negative' ? 'default' : color}
      variant={variant}
    >
      {finalChildren}
    </MUIButton>
  )
}

Button.propTypes = {
  color: PropTypes.string,
  compact: PropTypes.bool,
  icon: PropTypes.node,
  variant: PropTypes.string
}

Button.defaultProps = {
  color: 'default',
  compact: false,
  icon: null,
  variant: 'outlined'
}

Button.Group = Group

export default withStyles(styles)(Button)
