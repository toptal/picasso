import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import CircularProgress from '../CircularProgress'
import styles from './styles'

const SIZES = {
  small: 20,
  default: 40,
  large: 80
}

const getSize = size => {
  return SIZES[size] || SIZES.default
}

export const Loader = props => {
  const { children, classes, variant, size, inline, className, value } = props

  return (
    <div
      className={cx(classes.wrapper, className, {
        [classes.inline]: inline
      })}
    >
      <CircularProgress
        classes={{
          root: classes.spinner
        }}
        size={getSize(size)}
        value={value}
        variant={variant}
      />

      {children && <div className={classes.label}>{children}</div>}
    </div>
  )
}

Loader.propTypes = {
  /** Text content for the `Loader` */
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  /** Extra css classes to be passed to `Loader` */
  className: PropTypes.string,
  classes: PropTypes.shape({
    root: PropTypes.string
  }).isRequired,
  /** Shows loader as part of other inline elements such as text */
  inline: PropTypes.bool,
  /** Size of the `Loader` */
  size: PropTypes.oneOf(['small', 'default', 'large']),
  /** Current value for the `static` or `indeterminate` loaders */
  value: PropTypes.number,
  /** Variant of the `Loader` */
  variant: PropTypes.oneOf(['determinate', 'indeterminate', 'static'])
}

Loader.defaultProps = {
  children: null,
  className: undefined,
  inline: false,
  size: 'default',
  value: 0,
  variant: 'indeterminate'
}

Loader.displayName = 'Loader'

export default withStyles(styles)(Loader)
