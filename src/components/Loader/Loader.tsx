import React, { ReactNode, FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import CircularProgress from '../CircularProgress'
import { StandardProps, SizeType } from '../Picasso'
import styles from './styles'

enum SIZES {
  small = 20,
  medium = 40,
  large = 80
}

interface Props extends StandardProps {
  /** Text content for the `Loader` */
  children?: ReactNode
  /** Shows loader as part of other inline elements such as text */
  inline?: boolean
  /** Size of the `Loader` */
  size?: SizeType<'small' | 'medium' | 'large'>
  /** Set the value if want to have static loader with the value specified */
  value?: number
}

export const Loader: FunctionComponent<Props> = ({
  children,
  classes,
  size,
  inline,
  className,
  value
}) => (
  <div
    className={cx(classes.wrapper, className, {
      [classes.inline]: inline
    })}
  >
    <CircularProgress
      classes={{
        root: classes.spinner
      }}
      size={SIZES[size!]}
      value={value}
      variant={value ? 'static' : 'indeterminate'}
    />

    {children && <div className={classes.label}>{children}</div>}
  </div>
)

Loader.defaultProps = {
  inline: false,
  size: 'medium'
}

Loader.displayName = 'Loader'

export default withStyles(styles)(Loader)
