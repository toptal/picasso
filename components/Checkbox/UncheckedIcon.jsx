import React from 'react'
import PropTypes from 'prop-types'

const UncheckedIcon = ({ className }) => <div className={className} />

UncheckedIcon.propTypes = {
  className: PropTypes.string
}

UncheckedIcon.defaultProps = {
  className: null
}

export default UncheckedIcon
