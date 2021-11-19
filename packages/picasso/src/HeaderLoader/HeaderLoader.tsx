import React from 'react'
import { BaseProps } from '@toptal/picasso-shared'
import ContentLoader from 'react-content-loader'
import { palette } from '@toptal/picasso/utils'

const HEIGHT = 10
const WIDTH = 200
const CONTAINER_HEIGHT = HEIGHT * 2
const VERTICAL_OFFSET = HEIGHT / 2
const BORDER_RADIUS = HEIGHT / 2

export type Props = BaseProps

export const HeaderLoader = ({ className, style }: Props) => {
  return (
    <ContentLoader
      className={className}
      color={palette.grey.main2}
      width={WIDTH}
      height={CONTAINER_HEIGHT}
      style={style}
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
