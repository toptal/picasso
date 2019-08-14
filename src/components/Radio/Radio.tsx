import React, { FunctionComponent } from 'react'
import MUIRadio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import { withStyles } from '@material-ui/core/styles'

import FormControlLabel from '../FormControlLabel'
import Form from '../Form'
import {
  PicassoComponent,
  StandardProps,
  ButtonOrAnchorProps
} from '../Picasso'
import styles from './styles'

export interface Props
  extends StandardProps,
    Omit<ButtonOrAnchorProps, 'onChange' | 'value'> {
  /** Text label for the `Radio` */
  label?: string
  /** Value of the `Radio` component used with conjuction of `Radio.Group` */
  value?: string | number | boolean
  /** Defines if `Radio` is disabled */
  disabled?: boolean
  /** Defines if `Radio` is checked by default */
  checked?: boolean
  /** Callback invoked when `Radio` changes its state */
  onChange?: (event: object, checked: boolean) => void
}

// should be moved to some global interfaces place
interface StaticProps {
  Group: typeof RadioGroup
}

export const Radio: FunctionComponent<Props> & StaticProps = ({
  classes,
  className,
  style,
  label,
  checked,
  disabled,
  value,
  onChange,
  ...rest
}) => {
  const rootClasses = {
    root: classes.root,
    disabled: classes.disabled
  }
  const muiRadio = (
    <MUIRadio
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      checked={checked}
      disabled={disabled}
      onChange={onChange}
      value={value}
      icon={<div className={classes.uncheckedIcon} />}
      checkedIcon={<div className={classes.checkedIcon} />}
      color='default'
      classes={rootClasses}
      className={className}
      style={style}
    />
  )

  if (!label) {
    return muiRadio
  }

  return (
    <FormControlLabel
      control={muiRadio}
      className={classes.label}
      classes={rootClasses}
      style={style}
      label={
        <Form.Label disabled={disabled} as='span'>
          {label}
        </Form.Label>
      }
    />
  )
}

Radio.defaultProps = {
  classes: {},
  disabled: false
}

Radio.displayName = 'Radio'

Radio.Group = RadioGroup

export default withStyles(styles)(Radio) as PicassoComponent<Props, StaticProps>
