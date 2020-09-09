import React, { FC } from 'react'
import { BaseProps } from '@toptal/picasso-shared'
import ContentLoader from 'react-content-loader'
import { palette } from '@toptal/picasso/utils'

const WIDTH = 80
const HEIGHT = 32
const BORDER_RADIUS = 4
const VIEW_BOX = `0 0 ${WIDTH} ${HEIGHT}`

export const ButtonLoader: FC<BaseProps> = () => (
  <ContentLoader
    viewBox={VIEW_BOX}
    color={palette.grey.main2}
    width={WIDTH}
    height={HEIGHT}
  >
    <rect
      x={0}
      y='0'
      rx={BORDER_RADIUS}
      ry={BORDER_RADIUS}
      width={WIDTH}
      height={HEIGHT}
    />
  </ContentLoader>
)

ButtonLoader.displayName = 'ButtonLoader'

export default ButtonLoader
