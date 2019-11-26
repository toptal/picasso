import React, { ReactNode, forwardRef, HTMLAttributes } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { capitalize } from '@material-ui/core/utils/helpers'
import cx from 'classnames'
import { StandardProps, SizeType } from '@toptal/picasso-shared'

import CircularProgress from '../CircularProgress'
import styles from './styles'

enum SIZES {
  small = 16,
  medium = 32,
  large = 64
}

type VariantType = 'blue' | 'inherit'

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /** Text content for the `Loader` */
  children?: ReactNode
  /** Shows loader as part of other inline elements such as text */
  inline?: boolean
  /** Size of the `Loader` */
  size?: SizeType<'small' | 'medium' | 'large'>
  /** Set the value if want to have static loader with the value specified */
  value?: number
  /** Set this value if you want loader to inherit color of the parent, primary by default */
  variant?: VariantType
}

export const Loader = forwardRef<HTMLDivElement, Props>(function Loader(
  {
    children,
    classes,
    size,
    inline,
    className,
    value,
    variant = 'blue',
    ...rest
  },
  ref
) {
  return (
    <div
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      ref={ref}
      className={cx(classes.wrapper, className, {
        [classes.inline]: inline
      })}
    >
      <CircularProgress
        classes={{
          root: classes[`spinner${capitalize(variant!)}`]
        }}
        size={SIZES[size!]}
        value={value}
        variant={value ? 'static' : 'indeterminate'}
      />

      {children && <div className={classes.label}>{children}</div>}
    </div>
  )
})

Loader.defaultProps = {
  inline: false,
  size: 'medium',
  variant: 'blue'
}

Loader.displayName = 'Loader'

export default withStyles(styles)(Loader)
