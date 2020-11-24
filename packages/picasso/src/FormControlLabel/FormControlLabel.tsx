import React, {
  FunctionComponent,
  ReactElement,
  ReactNode,
  LabelHTMLAttributes
} from 'react'
import { FormControlLabelProps } from '@material-ui/core/FormControlLabel'
import { withStyles } from '@material-ui/core/styles'
import { StandardProps, TextLabelProps } from '@toptal/picasso-shared'
import cx from 'classnames'

import styles from './styles'
import Form from '../Form'

export type FormControlLabelAttributesType = LabelHTMLAttributes<
  HTMLLabelElement
> &
  Pick<FormControlLabelProps, 'onChange'>

export interface Props
  extends StandardProps,
    TextLabelProps,
    FormControlLabelAttributesType {
  /** A control element. For instance, it can be be a Radio or a Checkbox */
  control: ReactElement
  /** The text to be used in an enclosing label element */
  label?: ReactNode
  /** Shows whether label is disabled or not */
  disabled?: boolean
  /** Whether to show asterisk for the label */
  showAsterisk?: boolean
  /** Whether to show (optional) postfix for the label */
  showOptional?: boolean
}

const FormControlLabel: FunctionComponent<Props> = props => {
  const {
    control,
    label,
    classes,
    className,
    style,
    disabled,
    showAsterisk,
    showOptional,
    titleCase,
    ...rest
  } = props

  return (
    <label
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      className={cx(
        classes.root,
        {
          [classes.disabled]: disabled
        },
        className
      )}
      style={style}
    >
      {React.cloneElement(control, { disabled })}
      <Form.Label
        className={classes.label}
        as='span'
        showAsterisk={showAsterisk}
        showOptional={showOptional}
        disabled={disabled}
        titleCase={titleCase}
      >
        {label}
      </Form.Label>
    </label>
  )
}

FormControlLabel.displayName = 'FormControlLabel'

export default withStyles(styles)(FormControlLabel)
