import React from 'react'
import PropTypes from 'prop-types'

import MinusSvg from '../Icons/Minus'

const IndeterminateIcon = ({ className, color }) => (
  <div className={className}>
    <MinusSvg fill={color} />
  </div>
)

IndeterminateIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string
}

IndeterminateIcon.defaultProps = {
  className: null,
  color: null
}

export default IndeterminateIcon
