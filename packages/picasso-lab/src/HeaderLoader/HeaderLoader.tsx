import React, { FC } from 'react'
import { BaseProps } from '@toptal/picasso-shared'
import ContentLoader from 'react-content-loader'
import { palette } from '@toptal/picasso/utils'

const HEIGHT = 10
const WIDTH = 200
const CONTAINTER_HEIGHT = HEIGHT * 2
const VIEW_BOX = `0 0 ${WIDTH} ${CONTAINTER_HEIGHT}`
const BORDER_RADIUS = HEIGHT / 2

export const HeaderLoader: FC<BaseProps> = ({ className, style }) => (
  <ContentLoader
    viewBox={VIEW_BOX}
    className={className}
    color={palette.grey.main2}
    height={CONTAINTER_HEIGHT}
    style={style}
  >
    <rect
      x='0'
      y='0'
      rx={BORDER_RADIUS}
      ry={BORDER_RADIUS}
      width={WIDTH}
      height={HEIGHT}
    />
  </ContentLoader>
)

HeaderLoader.displayName = 'HeaderLoader'

export default HeaderLoader
