import React from 'react'
import PropTypes from 'prop-types'

const Spacer = ({ children, top, bottom, left, right }) => {
  return (
    <div
      style={{
        marginTop: top + 'em',
        marginBottom: bottom + 'em',
        marginLeft: left + 'em',
        marginRight: right + 'em'
      }}
    >
      {children}
    </div>
  )
}

Spacer.propTypes = {
  bottom: PropTypes.number,
  children: PropTypes.node,
  left: PropTypes.number,
  right: PropTypes.number,
  top: PropTypes.number
}

Spacer.defaultProps = {
  bottom: 0,
  children: null,
  left: 0,
  right: 0,
  top: 0
}

export default Spacer
