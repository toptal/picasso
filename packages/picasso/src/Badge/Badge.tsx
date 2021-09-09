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
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoBadge' })

const threshold = {
  small: 10,
  medium: 100,
  large: 100
}

const getTransformedContent = (
  content: Props['content'],
  size: SizeType
): string => {
  const sizeThreshold = threshold[size]

  if (content >= sizeThreshold) {
    return `${sizeThreshold - 1}+`
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
    'data-testid': dataTestId
  } = props
  const classes = useStyles()

  if (!content) {
    return null
  }

  return (
    <Chip
      ref={ref}
      style={style}
      label={getTransformedContent(content, size)}
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

Badge.displayName = 'Badge'

export default Badge
