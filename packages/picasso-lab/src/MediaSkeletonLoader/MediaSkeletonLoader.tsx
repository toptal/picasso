import React, { useMemo } from 'react'
import { palette } from '@toptal/picasso/utils'
import ContentLoader from 'react-content-loader'
import { stringToNumber, px, BaseProps } from '@toptal/picasso-shared'

interface ImageProps extends BaseProps {
  /** Each variant exposes a different set of props */
  variant: 'image'
  width: string | number
  height: string | number
  circle?: boolean
}

interface AvatarProps extends BaseProps {
  variant: 'avatar'
  size?: 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large'
}

interface IconProps extends BaseProps {
  variant: 'icon'
  circle?: boolean
  size?: 'medium' | 'large'
}

export type Props = ImageProps | AvatarProps | IconProps

// all sizes are in pixels
const WIDTH = 16
const HEIGHT = 16
const BORDER_RADIUS = '5px'

const AVATAR_SIZES = {
  xxsmall: 32,
  xsmall: 40,
  small: 80,
  medium: 120,
  large: 160
}

const ICON_SIZES = {
  medium: 16,
  large: 24
}

interface LoaderAttributes {
  width: number
  height: number
  borderRadius: string
}

export const getAvatarAttributes = ({
  size = 'xsmall'
}: Omit<AvatarProps, 'variant'>): LoaderAttributes => {
  const boxSize = AVATAR_SIZES[size]

  return {
    width: boxSize,
    height: boxSize,
    borderRadius: BORDER_RADIUS
  }
}

export const getIconAttributes = ({
  size = 'medium',
  circle
}: Omit<IconProps, 'variant'>): LoaderAttributes => {
  const boxSize = ICON_SIZES[size]

  return {
    width: boxSize,
    height: boxSize,
    borderRadius: circle ? '50%' : BORDER_RADIUS
  }
}

export const getImageAttributes = ({
  circle,
  width,
  height
}: Omit<ImageProps, 'variant'>): LoaderAttributes => ({
  width: typeof width === 'string' ? stringToNumber(px(width)) : width,
  height: typeof height === 'string' ? stringToNumber(px(height)) : height,
  borderRadius: circle ? '50%' : BORDER_RADIUS
})

export const getAttributes = (props: React.PropsWithChildren<Props>) => {
  let attributes

  switch (props.variant) {
    case 'icon':
      attributes = getIconAttributes(props)
      break
    case 'avatar':
      attributes = getAvatarAttributes(props)
      break
    case 'image':
      attributes = getImageAttributes(props)
      break
    default:
      attributes = {
        width: WIDTH,
        height: HEIGHT,
        borderRadius: BORDER_RADIUS
      }
  }

  return attributes
}

export const MediaSkeletonLoader = (props: Props) => {
  const { className, style } = props
  const { width, height, borderRadius } = useMemo(() => getAttributes(props), [
    props
  ])

  const viewBox = `0 0 ${width} ${height}`

  return (
    <ContentLoader
      viewBox={viewBox}
      color={palette.grey.main2}
      width={width}
      height={height}
      data-testid={props['data-testid']}
      className={className}
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

MediaSkeletonLoader.displayName = 'MediaSkeletonLoader'

MediaSkeletonLoader.defaultProps = {
  variant: 'avatar'
}

export default MediaSkeletonLoader
