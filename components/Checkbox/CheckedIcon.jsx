import React from 'react'
import PropTypes from 'prop-types'

import CheckSvg from '../Icons/Check'

const CheckedIcon = ({ className }) => (
  <div className={className}>
    <CheckSvg />
  </div>
)

CheckedIcon.propTypes = {
  className: PropTypes.string
}

CheckedIcon.defaultProps = {
  className: null
}

export default CheckedIcon
