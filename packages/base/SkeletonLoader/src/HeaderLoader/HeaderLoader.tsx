import React from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import ContentLoader from 'react-content-loader'
import { loaderPalette } from '@toptal/picasso-utils'

const HEIGHT = 10
const WIDTH = 200
const CONTAINER_HEIGHT = HEIGHT * 2
const VERTICAL_OFFSET = HEIGHT / 2
const BORDER_RADIUS = HEIGHT / 2

export interface Props extends BaseProps {
  /** Default to random unique id, you can set your own unique id to fix SSR */
  uniqueKey?: string
}

export const HeaderLoader = ({ className, style, uniqueKey }: Props) => {
  return (
    <ContentLoader
      className={className}
      foregroundColor={loaderPalette.foreground}
      backgroundColor={loaderPalette.background}
      width={WIDTH}
      height={CONTAINER_HEIGHT}
      style={style}
      uniqueKey={uniqueKey}
    >
      <rect
        x='0'
        y={VERTICAL_OFFSET}
        rx={BORDER_RADIUS}
        ry={BORDER_RADIUS}
        width='100%'
        height={HEIGHT}
      />
    </ContentLoader>
  )
}

HeaderLoader.displayName = 'HeaderLoader'

export default HeaderLoader
