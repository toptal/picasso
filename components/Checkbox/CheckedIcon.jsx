import React from 'react'
import PropTypes from 'prop-types'

import checkSvg from '../Icons/check.svg'

const CheckedIcon = ({ className }) => (
  <div className={className}>
    {/* // TODO: Replace with Icon component and remove fill prop from svg */}
    <img src={checkSvg} />
  </div>
)

CheckedIcon.propTypes = {
  className: PropTypes.string
}

export default CheckedIcon
