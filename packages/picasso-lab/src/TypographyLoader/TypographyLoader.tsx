import React from 'react'
import { BaseProps } from '@toptal/picasso-shared'
import ContentLoader from 'react-content-loader'
import { palette } from '@toptal/picasso/utils'

export interface Props extends BaseProps {
  /** Specify the amount of rows */
  rows?: number
}

const HEIGHT = 10
const WIDTH = 1440
const CONTAINER_HEIGHT = HEIGHT * 2
const VIEW_BOX = `0 0 ${WIDTH} ${CONTAINER_HEIGHT}`
const BORDER_RADIUS = HEIGHT / 2

export const Paragraph = () => (
  <ContentLoader
    viewBox={VIEW_BOX}
    color={palette.grey.main2}
    height={CONTAINER_HEIGHT}
    style={{ width: '100%' }}
  >
    <rect
      x='0'
      y='0'
      rx={BORDER_RADIUS}
      ry={BORDER_RADIUS}
      width='100%'
      height={HEIGHT}
    />
  </ContentLoader>
)
export const TypographyLoader = ({ rows = 1 }: Props) => (
  <>
    {[...Array(rows)].map((_, index) => (
      <Paragraph key={index} />
    ))}
  </>
)

TypographyLoader.displayName = 'TypographyLoader'

export default TypographyLoader
