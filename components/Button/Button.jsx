import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import MUIButton from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import { capitalize } from '@material-ui/core/utils/helpers'

import styles from './styles'
import Loader from '../Loader'
import Group from '../ButtonGroup'

const Button = props => {
  const {
    icon,
    loading,
    children,
    classes,
    variant,
    color,
    compact,
    ...rest
  } = props
  const {
    icon: iconClass,
    root: rootClass,
    children: childrenClass,
    hidden: hiddenClass,
    loader: loaderClass,
    ...restClasses
  } = classes
  let finalChildren = [children]

  if (icon) {
    const iconComponent = React.cloneElement(icon, { className: iconClass })

    finalChildren.unshift(iconComponent)
  }

  const rootClassName = cx(
    {
      [classes[`${variant.toLowerCase()}Negative`]]: color === 'negative',
      [classes.compact]: compact
    },
    classes[`${variant}${capitalize(color)}`],
    rootClass
  )

  return (
    <MUIButton
      classes={{
        root: rootClassName,
        ...restClasses
      }}
      color={color === 'negative' ? 'default' : color}
      variant={variant}
      {...rest}
    >
      <div className={cx(childrenClass, { [hiddenClass]: loading })}>
        {finalChildren}
      </div>

      {loading && <Loader className={loaderClass} inline size='small' />}
    </MUIButton>
  )
}

Button.propTypes = {
  color: PropTypes.string,
  compact: PropTypes.bool,
  icon: PropTypes.node,
  variant: PropTypes.string,
  loading: PropTypes.bool
}

Button.defaultProps = {
  color: 'default',
  compact: false,
  icon: null,
  loading: false,
  variant: 'outlined'
}

Button.Group = Group

export default withStyles(styles)(Button)
