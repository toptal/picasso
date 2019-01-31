import React from 'react'
import PropTypes from 'prop-types'

import MinusSvg from '../Icons/Minus'

const IndeterminateIcon = ({ className }) => (
  <div className={className}>
    <MinusSvg />
  </div>
)

IndeterminateIcon.propTypes = {
  className: PropTypes.string
}

IndeterminateIcon.defaultProps = {
  className: null
}

export default IndeterminateIcon
