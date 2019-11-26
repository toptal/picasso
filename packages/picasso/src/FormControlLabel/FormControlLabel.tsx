import React, {
  FunctionComponent,
  ReactElement,
  ReactNode,
  LabelHTMLAttributes
} from 'react'
import MUIFormControlLabel, {
  FormControlLabelProps
} from '@material-ui/core/FormControlLabel'
import { withStyles } from '@material-ui/core/styles'
import { StandardProps } from '@toptal/picasso-shared'

import styles from './styles'

export type FormControlLabelAttributesType = LabelHTMLAttributes<
  HTMLLabelElement
> &
  Pick<FormControlLabelProps, 'onChange'>

export interface Props extends StandardProps, FormControlLabelAttributesType {
  /** A control element. For instance, it can be be a Radio, a Switch or a Checkbox */
  control: ReactElement
  /** The text to be used in an enclosing label element */
  label?: ReactNode
}
const FormControlLabel: FunctionComponent<Props> = ({
  control,
  label,
  classes,
  className,
  style,
  ...rest
}) => (
  <MUIFormControlLabel
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest}
    control={control}
    label={label}
    classes={classes}
    className={className}
    style={style}
  />
)

export default withStyles(styles)(FormControlLabel)
