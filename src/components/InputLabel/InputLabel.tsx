import React, { ReactNode, FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIInputLabel from '@material-ui/core/InputLabel'

import { StandardProps } from '../Picasso'
import styles from './styles'

type VariantType = 'standard' | 'outlined' | 'filled'

export interface Props extends StandardProps {
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
  elementSelector
}) => (
  <MUIInputLabel
    variant={variant}
    htmlFor={htmlFor}
    classes={classes}
    className={className}
    style={style}
    data-qa={elementSelector}
  >
    {children}
  </MUIInputLabel>
)

export default withStyles(styles)(InputLabel)
