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
  /** Shows whether label is required or not */
  required?: boolean
}

const FormControlLabel: FunctionComponent<Props> = props => {
  const {
    control,
    label,
    classes,
    className,
    style,
    disabled,
    required,
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
        required={required}
        disabled={disabled}
        titleCase={titleCase}
      >
        {label}
      </Form.Label>
    </label>
  )
}

FormControlLabel.displayName = 'FormControlLabel'

// Using { index: -1 } to keep the correct CSS injection order (https://toptal-core.atlassian.net/browse/FX-1520)
export default withStyles(styles, { index: -1 })(FormControlLabel)
