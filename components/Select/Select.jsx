import React from 'react'
import PropTypes from 'prop-types'
import MUISelect from '@material-ui/core/Select'
import { withStyles } from '@material-ui/core/styles'

import OutlinedInput from '../OutlinedInput'
import MenuItem from '../MenuItem'
import styles from './styles'

const renderOptions = props => {
  const { options, native } = props

  if (!options.length) {
    return null
  }

  const OptionComponent = native ? 'option' : MenuItem

  return options.map(({ key, value, text }) => (
    <OptionComponent key={key || value} value={value}>
      {text}
    </OptionComponent>
  ))
}

const Select = props => {
  // eslint-disable-next-line
  const { children, options, variant, classes, inputProps, ...rest } = props
  const { outlinedInput, ...restClasses } = classes

  if (variant === 'outlined') {
    rest.input = (
      <OutlinedInput
        {...inputProps}
        classes={{
          input: outlinedInput
        }}
      />
    )
  }

  return (
    <MUISelect
      classes={restClasses}
      {...inputProps}
      {...rest}
      MenuProps={{
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left'
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'left'
        },
        getContentAnchorEl: undefined // needed to restore default behaviour
      }}
    >
      {renderOptions(props)}
    </MUISelect>
  )
}

Select.propTypes = {
  native: PropTypes.bool,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string.isRequired,
      text: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired
    })
  ).isRequired
}

Select.defaultProps = {
  native: false,
  onChange: () => {}
}

export default withStyles(styles)(Select)
