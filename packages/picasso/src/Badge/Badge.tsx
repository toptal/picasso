import React, { forwardRef } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import { BaseProps, TextLabelProps } from '@toptal/picasso-shared'
import { Chip } from '@material-ui/core'

import styles from './styles'

type VariantType = 'white' | 'red'
type SizeType = 'medium' | 'small' | 'large'

export interface Props extends BaseProps, TextLabelProps {
  /** The `Badge` content */
  content: number
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

const thresholds = {
  small: 9,
  medium: 99,
  large: 99
}

const format = (content: number, size: SizeType, max?: number): string => {
  const trimThreshold = max || thresholds[size]

  if (content > trimThreshold) {
    return `${trimThreshold}+`
  }

  return String(content)
}

// eslint-disable-next-line react/display-name
export const Badge = forwardRef<HTMLDivElement, Props>(function Badge (
  props,
  ref
) {
  const {
    style,
    variant = 'white',
    size = 'large',
    content,
    'data-testid': dataTestId,
    max
  } = props
  const classes = useStyles()

  return (
    <Chip
      ref={ref}
      style={style}
      label={format(content, size, max)}
      classes={{
        root: cx(classes.root, classes[variant], classes[size]),
        label: cx(classes[`${size}Label`])
      }}
      data-testid={dataTestId}
    />
  )
})

Badge.defaultProps = {
  variant: 'white',
  size: 'large'
}

Badge.displayName = 'PicassoBadge'

export default Badge
