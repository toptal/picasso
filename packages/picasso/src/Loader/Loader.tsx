import React, { ReactNode, forwardRef, HTMLAttributes } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import capitalize from '@material-ui/core/utils/capitalize'
import cx from 'classnames'
import { BaseProps, SizeType } from '@toptal/picasso-shared'
import { useAppConfig } from '@toptal/picasso-provider'

import CircularProgress from '../CircularProgress'
import styles from './styles'

const DEFAULT_PROGRESS = 35

enum SIZES {
  small = 16,
  medium = 32,
  large = 64
}

type VariantType = 'blue' | 'inherit'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
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

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoLoader' })

export const Loader = forwardRef<HTMLDivElement, Props>(function Loader (
  props,
  ref
) {
  const {
    children,
    size = 'medium',
    inline = false,
    className,
    value,
    variant = 'blue',
    ...rest
  } = props

  const classes = useStyles()
  const { disableTransitions } = useAppConfig()

  const progress = disableTransitions ? DEFAULT_PROGRESS : value
  const progressVariant =
    disableTransitions || value ? 'static' : 'indeterminate'

  return (
    <div
      {...rest}
      ref={ref}
      className={cx(classes.root, className, {
        [classes.inline]: inline
      })}
    >
      <CircularProgress
        classes={{
          root: classes[`spinner${capitalize(variant)}`]
        }}
        size={SIZES[size]}
        value={progress}
        variant={progressVariant}
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

export default Loader
