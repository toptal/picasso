import React, { FunctionComponent } from 'react'
import MUICheckbox from '@material-ui/core/Checkbox'
import { withStyles } from '@material-ui/core/styles'

import FormControlLabel from '../FormControlLabel'
import Form from '../Form'
import { StandardProps, ButtonOrAnchorProps } from '../Picasso'
import styles from './styles'

export interface Props
  extends StandardProps,
    Omit<ButtonOrAnchorProps, 'onChange'> {
  /** Show checkbox initially as checked */
  checked?: boolean
  /** Disable changing `Checkbox` state */
  disabled?: boolean
  /** Checkbox can show indeterminate value instead of boolean */
  indeterminate?: boolean
  /** Text label for the `Checkbox` */
  label?: string
  /** The id of the input element */
  id?: string
  /** Mark field as required */
  required?: boolean
  /** Callback invoked when `Checkbox` changed its value */
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void
  /** Value of the `Checkbox` (applicable only for controlled component) */
  value?: string
}

export const Checkbox: FunctionComponent<Props> = ({
  label,
  id,
  classes,
  className,
  style,
  disabled,
  required,
  onChange,
  value,
  checked,
  indeterminate,
  ...rest
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { color, ...checkboxAttributes } = rest

  const muiCheckbox = (
    <MUICheckbox
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...checkboxAttributes}
      checked={checked}
      icon={<div className={classes.uncheckedIcon} />}
      checkedIcon={<div className={classes.checkedIcon} />}
      indeterminateIcon={<div className={classes.indeterminateIcon} />}
      classes={{
        root: classes.root,
        disabled: classes.disabled
      }}
      className={className}
      style={style}
      disabled={disabled}
      id={id}
      indeterminate={indeterminate}
      onChange={onChange}
      value={value}
    />
  )

  if (!label) {
    return muiCheckbox
  }

  return (
    <FormControlLabel
      classes={{
        root: classes.root
      }}
      control={muiCheckbox}
      label={
        <Form.Label required={required} disabled={disabled} as='span'>
          {label}
        </Form.Label>
      }
    />
  )
}

Checkbox.defaultProps = {
  disabled: false,
  indeterminate: false,
  onChange: () => {}
}

Checkbox.displayName = 'Checkbox'

export default withStyles(styles)(Checkbox)
