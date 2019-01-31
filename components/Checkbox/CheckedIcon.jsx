import React from 'react'
import PropTypes from 'prop-types'

import CheckSvg from '../Icons/Check'

const CheckedIcon = ({ className, color }) => (
  <div className={className}>
    <CheckSvg fill={color} />
  </div>
)

CheckedIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string
}

CheckedIcon.defaultProps = {
  className: null,
  color: null
}

export default CheckedIcon
