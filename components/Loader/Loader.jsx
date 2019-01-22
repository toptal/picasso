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

const Loader = props => {
  const { label, classes, variant, size, inline, className, value } = props

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

      {label && <div className={classes.label}>{label}</div>}
    </div>
  )
}

Loader.propTypes = {
  label: PropTypes.string,
  variant: PropTypes.oneOf(['determinate', 'indeterminate', 'static']),
  size: PropTypes.oneOf(['small', 'default', 'large']),
  inline: PropTypes.bool,
  classes: PropTypes.shape({
    root: PropTypes.string
  }).isRequired,
  className: PropTypes.string,
  value: PropTypes.number
}

Loader.defaultProps = {
  className: '',
  inline: false,
  label: null,
  size: 'default',
  value: 0,
  variant: 'indeterminate'
}

export default withStyles(styles)(Loader)
