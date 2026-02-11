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
const SvgBadge16 = forwardRef(function SvgBadge16(
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
        d='M4.453 1.347 3.68 2.506l-1.167.778-1.173.782c-.003.002.119.627.271 1.389l.277 1.384-.278 1.372c-.153.754-.269 1.38-.257 1.39.011.011.491.333 1.067.716l1.047.697-.052.1c-.029.055-.495.873-1.035 1.819l-.982 1.72 1.471.014 1.47.013.764.6c.42.33.778.6.794.6.023 0 1.594-2.719 1.63-2.822.004-.013.113-.044.24-.07.224-.046.242-.046.466 0 .127.026.236.057.24.07.035.101 1.606 2.822 1.63 2.822.016 0 .374-.27.794-.6l.764-.6 1.47-.013 1.471-.014-.982-1.72c-.54-.946-1.006-1.764-1.035-1.819l-.052-.1 1.047-.697a78.386 78.386 0 0 0 1.067-.716c.012-.01-.104-.635-.257-1.39l-.278-1.371.277-1.385c.152-.761.274-1.387.271-1.389l-1.173-.782-1.167-.778-.773-1.159c-.426-.638-.788-1.16-.805-1.16-.017 0-.641.12-1.387.267L8 .721 6.645.454A85.753 85.753 0 0 0 5.258.187c-.017 0-.379.522-.805 1.16m4.696.167 1.148-.226.654.976.653.976.949.627.974.643c.013.009-.075.511-.206 1.166l-.231 1.151.231 1.15c.126.632.22 1.159.208 1.171a80.06 80.06 0 0 1-.975.649l-.953.628-.644.968c-.354.532-.648.972-.654.978a29.21 29.21 0 0 1-1.156-.219L8 11.923l-1.147.229a29.21 29.21 0 0 1-1.156.219c-.006-.006-.3-.446-.654-.978l-.644-.967-.953-.629a68.324 68.324 0 0 1-.975-.649c-.012-.012.082-.539.208-1.171l.231-1.15-.231-1.151c-.131-.654-.219-1.157-.206-1.166l.973-.643.949-.627.654-.976.654-.976 1.149.226L8 1.74l1.149-.226M4.693 12.68c.283.425.523.783.534.796.011.012.234-.021.497-.074.262-.053.484-.095.494-.095.015 0-.57 1.054-.603 1.087a5.976 5.976 0 0 1-.47-.352l-.46-.362h-.783c-.43 0-.782-.006-.782-.013 0-.044 1.025-1.799 1.041-1.781.01.011.25.369.532.794m7.69.1c.273.48.497.879.497.886 0 .008-.352.014-.783.014h-.784l-.459.362a6.674 6.674 0 0 1-.469.352c-.036-.036-.617-1.087-.601-1.087.011 0 .228.042.483.093.254.051.47.093.48.093.01 0 .262-.366.56-.814.298-.447.55-.804.56-.793.01.011.242.414.516.894'
      />
    </svg>
  )
})

SvgBadge16.displayName = 'SvgBadge16'
export default SvgBadge16
