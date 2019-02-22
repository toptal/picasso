import React from 'react'
import PropTypes from 'prop-types'

import Icon from '../Icons/Icon'
import Minus from '../Icons/Minus'
import IconsLibrary from '../Icons/IconsLibrary'
IconsLibrary.add(Minus)

const IndeterminateIcon = ({ className }) => (
  <div className={className}>
    <Icon name='minus' width={10} />
  </div>
)

IndeterminateIcon.propTypes = {
  className: PropTypes.string
}

IndeterminateIcon.defaultProps = {
  className: null
}

export default IndeterminateIcon
