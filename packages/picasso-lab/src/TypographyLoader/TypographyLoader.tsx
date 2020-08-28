import React from 'react'
import { BaseProps } from '@toptal/picasso-shared'
import ContentLoader from 'react-content-loader'
import { palette } from '@toptal/picasso/utils'

export interface Props extends BaseProps {
  /** Specify the amount of rows */
  rows?: number
}

const WIDTH = '100%'
const HEIGHT = 10
const CONTAINER_HEIGHT = HEIGHT * 2
const BORDER_RADIUS = HEIGHT / 2

const Paragraph = ({ className, style = {} }: BaseProps) => (
  <ContentLoader
    className={className}
    color={palette.grey.main2}
    height={CONTAINER_HEIGHT}
    style={{ width: WIDTH, ...style }}
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

export const TypographyLoader = ({ className, rows = 1, style }: Props) => (
  <>
    {Array.from({ length: rows }).map((_, index) => (
      <Paragraph className={className} key={index} style={style} />
    ))}
  </>
)

TypographyLoader.displayName = 'TypographyLoader'

export default TypographyLoader
