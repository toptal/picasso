import React, { FC } from 'react'
import { BaseProps } from '@toptal/picasso-shared'
import ContentLoader from 'react-content-loader'
import { palette } from '@toptal/picasso/utils'

const HEIGHT = 10
const WIDTH = 200
const CONTAINTER_HEIGHT = HEIGHT * 2
const VERTICAL_OFFSET = HEIGHT / 2
const BORDER_RADIUS = HEIGHT / 2

export const HeaderLoader: FC<BaseProps> = ({ className, style }) => (
  <ContentLoader
    className={className}
    color={palette.grey.main2}
    width={WIDTH}
    height={CONTAINTER_HEIGHT}
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

HeaderLoader.displayName = 'HeaderLoader'

export default HeaderLoader
