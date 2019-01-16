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
  children: PropTypes.node,
  top: PropTypes.number,
  bottom: PropTypes.number,
  left: PropTypes.number,
  right: PropTypes.number
}

export default Spacer
