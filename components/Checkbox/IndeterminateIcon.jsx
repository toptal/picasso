import React from 'react'
import PropTypes from 'prop-types'

import minusSvg from '../Icons/minus.svg'

const IndeterminateIcon = ({ className }) => (
  <div className={className}>
    {/* // TODO: Replace with Icon component and remove fill prop from svg */}
    <img src={minusSvg} />
  </div>
)

IndeterminateIcon.propTypes = {
  className: PropTypes.string
}

IndeterminateIcon.defaultProps = {
  className: null
}

export default IndeterminateIcon
