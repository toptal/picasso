import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { getColorClass } from './styles'

const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
  classes?: {
    root?: string
  }
}
const SvgEyeHide16 = forwardRef(function SvgEyeHide16(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const {
    classes,
    className,
    style = {},
    color,
    scale,
    base,
    'data-testid': testId,
  } = props
  const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1)
  const svgStyle = {
    minWidth: `${scaledSize}px`,
    minHeight: `${scaledSize}px`,
    ...style,
  }

  return (
    <svg
      fill='none'
      viewBox='0 0 16 16'
      className={twMerge(
        'fill-current inline-block text-inherit h-[1em] align-[-.125em]',
        classes?.root,
        className,
        getColorClass(color)
      )}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path
        fillRule='evenodd'
        d='M7.64 7.653.787 14.507l.353.353.353.353 6.86-6.86 6.86-6.859-.346-.347a6.274 6.274 0 0 0-.36-.347c-.008 0-3.098 3.084-6.867 6.853m-.539-4.598c-1.508.183-2.939.816-4.299 1.903-.823.657-1.763 1.651-2.531 2.675l-.275.366.194.26c.71.959 1.635 1.967 2.386 2.6l.242.204.356-.357c.196-.197.351-.362.345-.367a45.816 45.816 0 0 1-.346-.29c-.533-.451-1.232-1.183-1.771-1.856L1.247 8l.155-.193c.832-1.042 1.816-1.975 2.705-2.566 1.668-1.11 3.484-1.48 5.307-1.082l.252.055.393-.393c.216-.216.385-.401.374-.412-.035-.033-.553-.177-.892-.247a9.598 9.598 0 0 0-.675-.108 10.402 10.402 0 0 0-1.765.001m5.713 2.251c-.189.19-.339.35-.333.356l.266.219c.515.425 1.277 1.212 1.796 1.859l.209.259-.143.18c-.665.84-1.533 1.708-2.252 2.253-.923.699-1.86 1.155-2.864 1.393-.964.23-2.086.229-2.997-.002l-.158-.04-.395.394c-.218.217-.387.403-.376.414.011.01.143.055.294.1a7.649 7.649 0 0 0 3.694.146c2.224-.469 4.302-1.973 6.174-4.469l.273-.365-.192-.262a15.996 15.996 0 0 0-1.706-1.968c-.433-.423-.875-.813-.921-.813-.013 0-.179.156-.369.346m-5.365-.255a3.127 3.127 0 0 0-1.565.827 3.011 3.011 0 0 0-.816 2.759l.031.143.451-.45c.374-.373.452-.465.464-.543.112-.722.466-1.24 1.057-1.548.234-.121.38-.17.635-.21l.172-.028.448-.447.448-.447-.127-.036c-.187-.052-.961-.065-1.198-.02m2.996 2.624-.446.447-.027.172a1.912 1.912 0 0 1-.216.642c-.286.556-.818.934-1.463 1.041l-.18.03-.447.447-.446.447.143.031a3.03 3.03 0 0 0 2.459-.552 2.966 2.966 0 0 0 1.17-2.393c-.001-.262-.057-.715-.093-.75a8.747 8.747 0 0 0-.454.438'
      />
    </svg>
  )
})

SvgEyeHide16.displayName = 'SvgEyeHide16'
export default SvgEyeHide16
