import React, { ReactNode, FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import CircularProgress from '../CircularProgress'
import { SizeType } from '../Picasso'
import { Classes } from '../styles/types'
import styles from './styles'

enum SIZES {
  small = 20,
  medium = 40,
  large = 80
}

type VariantType = 'determinate' | 'indeterminate' | 'static'

interface Props {
  /** Text content for the `Loader` */
  children?: ReactNode
  classes: Classes
  className?: string
  /** Shows loader as part of other inline elements such as text */
  inline?: boolean
  /** Size of the `Loader` */
  size?: SizeType<'small' | 'medium' | 'large'>
  /** Current value for the `static` or `indeterminate` loaders */
  value?: number
  /** Variant of the `Loader` */
  variant?: VariantType
}

export const Loader: FunctionComponent<Props> = ({
  children,
  classes,
  variant,
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
      variant={variant}
    />

    {children && <div className={classes.label}>{children}</div>}
  </div>
)

Loader.defaultProps = {
  inline: false,
  size: 'medium',
  value: 0,
  variant: 'indeterminate'
}

Loader.displayName = 'Loader'

export default withStyles(styles)(Loader)
