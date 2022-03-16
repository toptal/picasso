import React, { forwardRef } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import { Badge as MuiBadge } from '@material-ui/core'
import { BaseProps, TextLabelProps, useTitleCase } from '@toptal/picasso-shared'

import styles from './styles'
import { toTitleCase } from '../utils'

type VariantType = 'white' | 'red'
type SizeType = 'medium' | 'small' | 'large'

export interface Props extends BaseProps, TextLabelProps {
  /** The `Badge` content */
  content: number | string
  /** Variant of the `Badge` */
  variant?: VariantType
  /** Size of the `Badge` */
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
  props,
  ref
) {
  const {
    children,
    style,
    variant = 'white',
    size = 'medium',
    content,
    max,
    titleCase: propsTitleCase
  } = props

  const classes = useStyles()

  const titleCase = useTitleCase(propsTitleCase)

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
        anchorOriginTopRightRectangle: cx(
          classes.root,
          classes[variant],
          classes[size]
        )
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
