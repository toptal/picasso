/* eslint-disable react/no-array-index-key */
import React from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import ContentLoader from 'react-content-loader'
import { loaderPalette } from '@toptal/picasso-utils'

export interface Props extends BaseProps {
  /** Specify the amount of rows */
  rows?: number
  /** Default to random unique id, you can set your own unique id to fix SSR */
  uniqueKey?: string
}

const WIDTH = '100%'
const HEIGHT = 10
const CONTAINER_HEIGHT = HEIGHT * 2
const VERTICAL_OFFSET = HEIGHT / 2
const BORDER_RADIUS = HEIGHT / 2

const Paragraph = ({ className, style = {}, uniqueKey }: Props) => (
  <ContentLoader
    className={className}
    foregroundColor={loaderPalette.foreground}
    backgroundColor={loaderPalette.background}
    height={CONTAINER_HEIGHT}
    style={{ width: WIDTH, ...style }}
    uniqueKey={uniqueKey}
  >
    <rect
      x='0'
      y={VERTICAL_OFFSET}
      rx={BORDER_RADIUS}
      ry={BORDER_RADIUS}
      width={WIDTH}
      height={HEIGHT}
    />
  </ContentLoader>
)

export const TypographyLoader = ({
  className,
  rows = 1,
  style,
  uniqueKey,
}: Props) => (
  <>
    {Array.from({ length: rows }).map((_, index) => (
      <Paragraph
        className={className}
        key={index}
        style={style}
        uniqueKey={uniqueKey}
      />
    ))}
  </>
)

TypographyLoader.displayName = 'TypographyLoader'

export default TypographyLoader
