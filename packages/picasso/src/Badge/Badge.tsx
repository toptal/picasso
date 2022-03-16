import React, { Children, forwardRef } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import { Badge as MuiBadge } from '@material-ui/core'
import { BaseProps, TextLabelProps, useTitleCase } from '@toptal/picasso-shared'

import styles from './styles'
import { toTitleCase } from '../utils'

type VariantType = 'white' | 'red'
type SizeType = 'medium' | 'small' | 'large'

export interface Props extends BaseProps, TextLabelProps {
  /**
   * The `Badge` content
   */
  content: number | string

  /**
   * Variant of the `Badge`
   */
  variant?: VariantType

  /**
   * Size of the `Badge`
   */
  size?: SizeType

  /**
   * Max count to show. By default 9 for small size, 99 for other sizes
   */
  max?: number
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoBadge' })

const thresholds: { [k in SizeType]: number } = {
  small: 9,
  medium: 99,
  large: 99
}

const format = (content: number, size: SizeType, max?: number): string => {
  const trimThreshold = max ?? thresholds[size]

  if (content > trimThreshold) {
    return `${trimThreshold}+`
  }

  return String(content)
}

// eslint-disable-next-line react/display-name
export const Badge = forwardRef<HTMLDivElement, Props>(function Badge(
  {
    children,
    style,
    variant = 'white',
    size = 'medium',
    content,
    max,
    titleCase: propsTitleCase
  },
  ref
) {
  const classes = useStyles()

  const titleCase = useTitleCase(propsTitleCase)

  const hasChildren = Children.count(children) > 0

  return (
    <MuiBadge
      ref={ref}
      style={style}
      badgeContent={
        typeof content === 'string'
          ? titleCase
            ? toTitleCase(content)
            : content
          : format(content, size, max)
      }
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

Badge.displayName = 'Badge'

export default Badge
