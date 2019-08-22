import React, { forwardRef, HTMLAttributes } from 'react'
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
const CircularProgress = forwardRef<HTMLElement, Props>(
  function CircularProgress(
    { classes, className, style, size, value, variant, ...rest },
    ref
  ) {
    return (
      <MUICircularProgress
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        ref={ref}
        classes={classes}
        className={className}
        style={style}
        size={size}
        value={value}
        variant={variant}
      />
    )
  }
)

CircularProgress.displayName = 'CircularProgress'

export default withStyles(styles)(CircularProgress)
