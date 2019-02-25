import React from 'react'
import cx from 'classnames'
import MUIRadio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import { withStyles } from '@material-ui/core/styles'

import FormControlLabel from '../FormControlLabel'
import { Classes } from '../styles/types'
import styles from './styles'

const FallbackIcon = () => null

interface Props {
  classes: Classes
  label?: string
  color: 'default' | 'secondary'
  value?: string | number | boolean
  disabled?: boolean
  checked?: boolean
  onChange?: (event: object, checked: boolean) => void
}

// should be moved to some global interfaces place
interface GroupFunctionalComponent<T> extends React.FunctionComponent<T> {
  Group: React.ReactNode
}

const Radio: GroupFunctionalComponent<Props> = props => {
  const {
    classes: { root, icon, ...otherClasses },
    label,
    checked,
    color,
    disabled,
    value,
    onChange
  } = props

  const muiRadio = (
    <MUIRadio
      checked={checked}
      checkedIcon={<FallbackIcon />}
      classes={{
        ...otherClasses,
        root: cx(root, icon)
      }}
      color={color}
      disabled={disabled}
      icon={<FallbackIcon />}
      onChange={onChange}
      value={value}
    />
  )

  return label ? (
    <FormControlLabel control={muiRadio} label={label} />
  ) : (
    muiRadio
  )
}

Radio.defaultProps = {
  checked: undefined,
  classes: {},
  color: 'default',
  disabled: false,
  label: undefined,
  value: undefined
}

Radio.Group = RadioGroup

export default withStyles(styles)(Radio)
