import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import { StandardProps } from '../Picasso'
import Typography from '../Typography'
import styles from './styles'

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /** The text of the hint */
  children: ReactNode
}

export const FormHint = forwardRef<HTMLDivElement, Props>(function FormHint(
  { children, classes, className, style, ...rest },
  ref
) {
  return (
    <div
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      ref={ref}
      className={cx(classes.root, className)}
      style={style}
    >
      <Typography className={classes.hint}>{children}</Typography>
    </div>
  )
})

FormHint.defaultProps = {}

FormHint.displayName = 'FormHint'

export default withStyles(styles)(FormHint)
