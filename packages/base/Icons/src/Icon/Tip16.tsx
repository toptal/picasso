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
const SvgTip16 = forwardRef(function SvgTip16(
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
        d='M7.493 1.48v1.48h.987V0h-.987v1.48m4.734 1.56-1.093 1.093.353.354.353.353 1.107-1.107 1.106-1.106-.339-.34c-.187-.187-.352-.34-.367-.34-.015 0-.519.492-1.12 1.093m-9.894-.693-.346.347L3.08 3.787 4.173 4.88l.347-.347.347-.346-1.094-1.094L2.68 2l-.347.347m5.136 1.681a4.066 4.066 0 0 0-3.32 2.688c-.174.502-.213.749-.214 1.351-.001.601.03.813.189 1.289.186.557.45.995.919 1.524.401.453.656.858.8 1.274.116.334.135.482.149 1.173l.014.673H10v-.5c.001-.818.077-1.248.307-1.734.152-.321.285-.506.638-.886a4.032 4.032 0 0 0 1.059-2.027c.086-.398.087-1.166.001-1.564a4.465 4.465 0 0 0-.69-1.59 5.02 5.02 0 0 0-.949-.944 4.28 4.28 0 0 0-1.553-.675 5.794 5.794 0 0 0-1.344-.052m1.118 1.031a3.02 3.02 0 0 1 1.586.848c.388.388.664.864.807 1.392.064.24.07.303.07.781 0 .451-.008.548-.058.729-.154.557-.385.964-.803 1.413a7.494 7.494 0 0 0-.434.51c-.394.534-.684 1.333-.733 2.015l-.017.24h-.993c-1.115 0-1.025.018-1.025-.213 0-.167-.066-.517-.149-.793-.186-.62-.51-1.168-1.038-1.754-.465-.518-.716-.993-.826-1.564a4.062 4.062 0 0 1 0-1.155 3.007 3.007 0 0 1 .829-1.599c.733-.737 1.734-1.043 2.784-.85M1.013 8.493v.494h1.974V8H1.013v.493m12 0v.494h1.974V8h-1.974v.493m-6.999 6.634c.06.357.301.67.613.795l.16.065h2.426l.16-.065c.312-.125.553-.438.613-.795l.019-.114h-4.01l.019.114'
      />
    </svg>
  )
})

SvgTip16.displayName = 'SvgTip16'
export default SvgTip16
