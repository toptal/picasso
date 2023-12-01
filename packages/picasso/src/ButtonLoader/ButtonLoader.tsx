/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import ContentLoader from 'react-content-loader'
import { loaderPalette } from '@toptal/picasso-utils'
import type { ButtonProps } from '@toptal/picasso-button'

export interface Props extends BaseProps, Pick<ButtonProps, 'size'> {
  circular?: boolean

  /** Default to random unique id, you can set your own unique id to fix SSR */
  uniqueKey?: string
}

const BORDER_RADIUS = 4

// Extrapolated from `em` styles from @toptal/picasso/Button/styles.ts on the basis of 1em=16px
const BUTTON_SIZES = {
  small: 24,
  medium: 36,
  large: 48,
}

const BUTTON_HORIZONTAL_PADDINGS = {
  small: 36,
  medium: 52,
  large: 58,
}

export const ButtonLoader = ({
  style,
  className,
  size = 'medium',
  circular = false,
  uniqueKey,
}: Props) => {
  const borderRadius = circular ? '50%' : BORDER_RADIUS
  const height = BUTTON_SIZES[size]
  const width = circular ? height : height + BUTTON_HORIZONTAL_PADDINGS[size]

  return (
    <ContentLoader
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      foregroundColor={loaderPalette.foreground}
      backgroundColor={loaderPalette.background}
      width={width}
      height={height}
      style={style}
      uniqueKey={uniqueKey}
    >
      <rect
        x='0'
        y='0'
        rx={borderRadius}
        ry={borderRadius}
        width={width}
        height={height}
      />
    </ContentLoader>
  )
}

ButtonLoader.displayName = 'ButtonLoader'

export default ButtonLoader
