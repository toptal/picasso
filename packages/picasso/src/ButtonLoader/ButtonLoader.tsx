import React from 'react'
import { BaseProps } from '@toptal/picasso-shared'
import ContentLoader from 'react-content-loader'

import { palette } from '../utils'
import { ButtonProps } from '../Button'

export interface Props extends BaseProps, Pick<ButtonProps, 'size'> {
  circular?: boolean
}

const BORDER_RADIUS = 4

// Extrapolated from `em` styles from @toptal/picasso/Button/styles.ts on the basis of 1em=16px
const BUTTON_SIZES = {
  small: 24,
  medium: 36,
  large: 48
}

const BUTTON_HORIZONTAL_PADDINGS = {
  small: 36,
  medium: 52,
  large: 58
}

export const ButtonLoader = ({
  style,
  className,
  size = 'medium',
  circular = false
}: Props) => {
  const borderRadius = circular ? '50%' : BORDER_RADIUS
  const height = BUTTON_SIZES[size]
  const width = circular ? height : height + BUTTON_HORIZONTAL_PADDINGS[size]

  return (
    <ContentLoader
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      color={palette.grey.main2}
      width={width}
      height={height}
      style={style}
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
