import React, { useMemo } from 'react'
import ContentLoader from 'react-content-loader'
import type { BaseProps } from '@toptal/picasso-shared'
import { pxFromRem } from '@toptal/picasso-shared'
import { loaderPalette } from '@toptal/picasso-utils'

interface MediaSkeletonBase extends BaseProps {
  /** Default to random unique id, you can set your own unique id to fix SSR */
  uniqueKey?: string
}
interface ImageProps extends MediaSkeletonBase {
  /** Each variant exposes a different set of props */
  variant: 'image'
  width: string | number
  height: string | number
  circle?: boolean
}

interface AvatarProps extends MediaSkeletonBase {
  variant: 'avatar'
  size?: 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large'
}

interface IconProps extends MediaSkeletonBase {
  variant: 'icon'
  circle?: boolean
  size?: 'medium' | 'large'
}

export type Props = ImageProps | AvatarProps | IconProps

const BORDER_RADIUS = '5px'

const AVATAR_SIZES = {
  xxsmall: 32,
  xsmall: 40,
  small: 80,
  medium: 120,
  large: 160,
}

const ICON_SIZES = {
  medium: 16,
  large: 24,
}

interface LoaderAttributes {
  width: number
  height: number
  borderRadius: string
}

export const getAvatarAttributes = ({
  size = 'xsmall',
}: Omit<AvatarProps, 'variant'>): LoaderAttributes => {
  const boxSize = AVATAR_SIZES[size]

  return {
    width: boxSize,
    height: boxSize,
    borderRadius: BORDER_RADIUS,
  }
}

export const getIconAttributes = ({
  size = 'medium',
  circle,
}: Omit<IconProps, 'variant'>): LoaderAttributes => {
  const boxSize = ICON_SIZES[size]

  return {
    width: boxSize,
    height: boxSize,
    borderRadius: circle ? '50%' : BORDER_RADIUS,
  }
}

export const getImageAttributes = ({
  circle,
  width,
  height,
}: Omit<ImageProps, 'variant'>): LoaderAttributes => ({
  width:
    typeof width === 'string' ? Number.parseFloat(pxFromRem(width)) : width,
  height:
    typeof height === 'string' ? Number.parseFloat(pxFromRem(height)) : height,
  borderRadius: circle ? '50%' : BORDER_RADIUS,
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
  }

  return attributes
}

export const MediaSkeletonLoader = ({
  variant = 'avatar',
  ...props
}: Props) => {
  const { className, style, uniqueKey } = props
  const { width, height, borderRadius } = useMemo(
    () => getAttributes({ variant, ...props } as Props),
    [variant, props]
  )

  const viewBox = `0 0 ${width} ${height}`

  return (
    <ContentLoader
      viewBox={viewBox}
      foregroundColor={loaderPalette.foreground}
      backgroundColor={loaderPalette.background}
      width={width}
      height={height}
      data-testid={props['data-testid']}
      className={className}
      style={style}
      uniqueKey={uniqueKey}
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

export default MediaSkeletonLoader
