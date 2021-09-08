import React, {
  ReactElement,
  ReactNode,
  LabelHTMLAttributes,
  forwardRef
} from 'react'
import { FormControlLabelProps } from '@material-ui/core/FormControlLabel'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { StandardProps, TextLabelProps } from '@toptal/picasso-shared'
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

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoFormControlLabel'
})

const FormControlLabel = forwardRef<HTMLLabelElement, Props>(
  function FormControlLabel(props, ref) {
    const {
      control,
      label,
      className,
      style,
      disabled,
      requiredDecoration,
      titleCase,
      // Avoid passing external classes inside the rest props
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      classes: externalClasses,
      ...rest
    } = props

    const classes = useStyles(props)

    return (
      <label
        {...rest}
        ref={ref}
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
)

FormControlLabel.displayName = 'FormControlLabel'

export default FormControlLabel
