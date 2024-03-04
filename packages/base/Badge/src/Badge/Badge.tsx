import type { ReactNode } from 'react'
import React, { Children, forwardRef } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import { Badge as MuiBadge } from '@material-ui/core'
import type { BaseProps } from '@toptal/picasso-shared'

import styles from './styles'

type VariantType = 'white' | 'red'
type SizeType = 'medium' | 'small' | 'large'

export interface Props extends BaseProps {
  /** The `Badge` content */
  content: number

  /** Variant of the `Badge` */
  variant?: VariantType

  /** Size of the `Badge` */
  size?: SizeType

  /** Max count to show. By default 9 for small size, 99 for other sizes */
  max?: number

  /** The badged will be overlaid on it's children */
  children?: ReactNode
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoBadge' })

const thresholds: Record<SizeType, number> = {
  small: 9,
  medium: 99,
  large: 99,
}

export const Badge = forwardRef<HTMLDivElement, Props>(function Badge(
  {
    children,
    style,
    variant = 'white',
    size = 'large',
    content,
    className,
    max,
    'data-testid': testId,
  },
  ref
) {
  const classes = useStyles()

  const hasChildren = Children.count(children) > 0

  return (
    <MuiBadge
      ref={ref}
      style={style}
      data-testid={testId}
      badgeContent={content}
      max={max || thresholds[size]}
      className={className}
      showZero
      classes={{
        badge: cx(classes.root, classes[variant], classes[size], {
          [classes.static]: !hasChildren,
        }),
      }}
      overlap='rectangular'
    >
      {children}
    </MuiBadge>
  )
})

Badge.defaultProps = {
  variant: 'white',
  size: 'large',
}

Badge.displayName = 'Badge'

export default Badge
