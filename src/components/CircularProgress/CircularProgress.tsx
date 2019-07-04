import React, { FunctionComponent, HTMLAttributes } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUICircularProgress from '@material-ui/core/CircularProgress'

import { StandardProps } from '../Picasso'
import styles from './styles'

type VariantType = 'determinate' | 'indeterminate' | 'static'

interface Props
  extends StandardProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
  /** Size of the component */
  size?: number
  /** Current value for the `static` or `indeterminate` loaders */
  value?: number
  /** Variant of the `Loader` */
  variant?: VariantType
}
const CircularProgress: FunctionComponent<Props> = ({
  classes,
  className,
  style,
  size,
  value,
  variant,
  ...rest
}) => (
  <MUICircularProgress
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest}
    classes={classes}
    className={className}
    style={style}
    size={size}
    value={value}
    variant={variant}
  />
)

export default withStyles(styles)(CircularProgress)
