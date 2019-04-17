import React, { FunctionComponent, ReactElement, ReactNode } from 'react'
import MUIFormControlLabel from '@material-ui/core/FormControlLabel'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'

interface Props extends StandardProps {
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
  style
}) => (
  <MUIFormControlLabel
    control={control}
    label={label}
    classes={classes}
    className={className}
    style={style}
  />
)

export default withStyles(styles)(FormControlLabel)
