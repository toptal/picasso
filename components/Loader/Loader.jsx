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
  className: PropTypes.string,
  classes: PropTypes.shape({
    root: PropTypes.string
  }).isRequired,
  inline: PropTypes.bool,
  label: PropTypes.string,
  size: PropTypes.oneOf(['small', 'default', 'large']),
  value: PropTypes.number,
  variant: PropTypes.oneOf(['determinate', 'indeterminate', 'static'])
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
