import React, { ReactNode, FunctionComponent, LabelHTMLAttributes } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIInputLabel from '@material-ui/core/InputLabel'
import { StandardProps } from '@toptal/picasso-shared'

import styles from './styles'

type VariantType = 'standard' | 'outlined' | 'filled'

export interface Props
  extends StandardProps,
    LabelHTMLAttributes<HTMLLabelElement> {
  variant?: VariantType
  htmlFor?: string
  /** Label content */
  children?: ReactNode
}

const InputLabel: FunctionComponent<Props> = ({
  variant,
  htmlFor,
  classes,
  className,
  style,
  children,
  ...rest
}) => (
  <MUIInputLabel
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest}
    variant={variant}
    htmlFor={htmlFor}
    classes={classes}
    className={className}
    style={style}
  >
    {children}
  </MUIInputLabel>
)

export default withStyles(styles)(InputLabel)
