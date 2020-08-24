import React, { FC } from 'react'
import { palette } from '@toptal/picasso/utils'
import ContentLoader from 'react-content-loader'

interface ImageProps {
  variant: 'image'
  width: string
  height: string
  circle?: boolean
}

interface AvatarProps {
  variant: 'avatar'
  size?: 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large'
}

interface IconProps {
  variant: 'icon'
  circle?: boolean
  size?: 'medium' | 'large'
}

export type Props = ImageProps | AvatarProps | IconProps

const WIDTH = 2
const HEIGHT = 2
const BORDER_RADIUS = 5

const AVATAR_SIZES = {
  xxsmall: '32',
  xsmall: '40',
  small: '80',
  medium: '120',
  large: '160'
}

const ICON_SIZES = {
  medium: '16',
  large: '24'
}

interface LoaderAttributes {
  width: string
  height: string
  borderRadius: string | number
}

const getAvatarAttributes = ({
  size = 'xxsmall'
}: AvatarProps): LoaderAttributes => {
  const boxSize = AVATAR_SIZES[size]

  return {
    width: boxSize,
    height: boxSize,
    borderRadius: BORDER_RADIUS
  }
}

const getIconAttributes = ({
  size = 'medium',
  circle
}: IconProps): LoaderAttributes => {
  const boxSize = ICON_SIZES[size]

  return {
    width: boxSize,
    height: boxSize,
    borderRadius: circle ? '50%' : BORDER_RADIUS
  }
}

const getImageAttributes = ({
  circle,
  width,
  height
}: ImageProps): LoaderAttributes => ({
  width,
  height,
  borderRadius: circle ? '50%' : BORDER_RADIUS
})

export const MediaSkeletonLoader: FC<Props> = props => {
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
        heigth: HEIGHT,
        borderRadius: BORDER_RADIUS
      }
  }

  const { width, height, borderRadius } = attributes
  const viewBox = `0 0 ${width} ${height}`

  return (
    <ContentLoader
      viewBox={viewBox}
      color={palette.grey.main2}
      width={width}
      height={height}
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
