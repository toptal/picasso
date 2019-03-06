import React from 'react'
import PropTypes from 'prop-types'

import Icon from '../Icon/Icon'
import Check from '../Icon/Check'
import IconsLibrary from '../Icon/IconsLibrary'
IconsLibrary.add(Check)

const CheckedIcon = ({ className }) => (
  <div className={className}>
    <Icon name='check' width={9} />
  </div>
)

CheckedIcon.propTypes = {
  className: PropTypes.string
}

CheckedIcon.defaultProps = {
  className: null
}

export default CheckedIcon
