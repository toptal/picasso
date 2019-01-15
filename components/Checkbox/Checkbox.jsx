import React from 'react'
import PropTypes from 'prop-types'
import MUICheckbox from '@material-ui/core/Checkbox'
import { withStyles } from '@material-ui/core/styles'

import styles from './styles'
import checkSvg from '../Icons/check.svg'
import minusSvg from '../Icons/minus.svg'

const UncheckedIcon = (
  <div
    style={{
      height: '17px',
      width: '17px',
      transition: 'all .1s ease',
      background: '#fff',
      border: '1px solid #d4d4d5',
      borderRadius: '0'
    }}
  />
)

const CheckedIcon = (
  <div className={styles.checkedIcon}>
    {/* // TODO: Replace with Icon component and remove fill prop from svg */}
    <img src={checkSvg} />
  </div>
)

const IndeterminateIcon = (
  <div
    style={{
      color: '#fff',
      opacity: 1,
      textAlign: 'center',
      height: '17px',
      width: '17px',
      transition: 'all .1s ease',
      background: '#204ecf',
      border: '1px solid #d4d4d5',
      borderColor: 'rgba(34, 36, 38, .35)',
      borderRadius: '0'
    }}
  >
    {/* // TODO: Replace with Icon component and remove fill prop from svg */}
    <img src={minusSvg} />
  </div>
)

const Checkbox = props => {
  const { label, id, classes, ...rest } = props

  const muiCheckbox = (
    <MUICheckbox
      classes={{ ...classes }}
      {...rest}
      checkedIcon={CheckedIcon}
      icon={UncheckedIcon}
      id={id}
      indeterminateIcon={IndeterminateIcon}
    />
  )

  return label ? (
    <label
      htmlFor={id}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        color: '#455065',
        lineHeight: '17px',
        fontFamily: 'proxima-nova',
        fontWeight: 300
      }}
    >
      {muiCheckbox}
      <span style={{ paddingLeft: '0.5em' }}>{label}</span>
    </label>
  ) : (
    muiCheckbox
  )
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  indeterminate: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func
}

Checkbox.defaultProps = {
  checked: undefined,
  disabled: undefined,
  indeterminate: undefined,
  label: undefined,
  onChange: undefined
}

export default withStyles(styles.Checkbox)(Checkbox)
