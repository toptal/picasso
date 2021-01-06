import React, {
  FunctionComponent,
  ReactElement,
  ReactNode,
  LabelHTMLAttributes
} from 'react'
import { FormControlLabelProps } from '@material-ui/core/FormControlLabel'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { JssProps, StandardProps, TextLabelProps } from '@toptal/picasso-shared'
import cx from 'classnames'

import { RequiredDecoration } from '../FormLabel'
import styles from './styles'
import Form from '../Form'

export type FormControlLabelAttributesType = LabelHTMLAttributes<
  HTMLLabelElement
> &
  Pick<FormControlLabelProps, 'onChange'>

export interface Props
  extends StandardProps,
    JssProps,
    TextLabelProps,
    FormControlLabelAttributesType {
  /** A control element. For instance, it can be be a Radio or a Checkbox */
  control: ReactElement
  /** The text to be used in an enclosing label element */
  label?: ReactNode
  /** Shows whether label is disabled or not */
  disabled?: boolean
  /** Whether to show asterisk or (optional) postfix as a 'required' decoration */
  requiredDecoration?: RequiredDecoration
}

const useStyles = makeStyles<Theme, JssProps>(styles, {
  name: 'PicassoFormControlLabel'
})

const FormControlLabel: FunctionComponent<Props> = props => {
  const {
    control,
    label,
    className,
    style,
    disabled,
    requiredDecoration,
    titleCase,
    classes: externalClasses,
    ...rest
  } = props

  const classes = useStyles({ classes: externalClasses })

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
        requiredDecoration={requiredDecoration}
        disabled={disabled}
        titleCase={titleCase}
      >
        {label}
      </Form.Label>
    </label>
  )
}

FormControlLabel.displayName = 'FormControlLabel'

export default FormControlLabel
