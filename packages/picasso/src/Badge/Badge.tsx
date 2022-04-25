import React, { Children, forwardRef, ReactNode } from 'react'
import { Theme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import cx from 'classnames'
import { Badge as MuiBadge } from '@mui/material'
import { BaseProps } from '@toptal/picasso-shared'

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
  large: 99
}

const formatNumber = (
  content: number,
  size: SizeType,
  max: number | undefined
): string => {
  const trimThreshold = max ?? thresholds[size]

  return content > trimThreshold ? `${trimThreshold}+` : String(content)
}

export const Badge = forwardRef<HTMLDivElement, Props>(function Badge(
  {
    children,
    style,
    variant = 'white',
    size = 'large',
    content,
    max,
    'data-testid': testId
  },
  ref
) {
  const classes = useStyles()

  const hasChildren = Children.count(children) > 0

  const badgeContent = formatNumber(content, size, max)

  return (
    <MuiBadge
      ref={ref}
      style={style}
      data-testid={testId}
      badgeContent={badgeContent}
      classes={{
        badge: cx(classes.root, classes[variant], classes[size], {
          [classes.static]: !hasChildren
        })
      }}
    >
      {children}
    </MuiBadge>
  )
})

Badge.defaultProps = {
  variant: 'white',
  size: 'large'
}

Badge.displayName = 'Badge'

export default Badge
