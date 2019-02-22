import React from 'react'
import PropTypes from 'prop-types'

import Icon from '../Icons/Icon'
import Check from '../Icons/Check'
import IconsLibrary from '../Icons/IconsLibrary'
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
