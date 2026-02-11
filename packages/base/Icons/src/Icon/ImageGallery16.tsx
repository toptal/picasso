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
const SvgImageGallery16 = forwardRef(function SvgImageGallery16(
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
        d='M0 8v6h13.013V2H0v6m12-3.847v1.14l-.753-.753-.754-.753-3.051 3.051-3.051 3.051-.955-.478a25.766 25.766 0 0 0-.983-.478c-.015 0-.339.234-.72.52-.38.286-.698.52-.706.52-.007 0-.014-1.566-.014-3.48v-3.48H12v1.14m2-.646V4h.987v8H14v1.013h2v-10h-2v.494m-10.331.519c-.45.082-.898.341-1.2.694a1.988 1.988 0 0 0-.313 2.047c.191.471.606.886 1.077 1.077.76.309 1.601.142 2.177-.434a1.987 1.987 0 0 0 .087-2.73 2.265 2.265 0 0 0-.993-.615 2.892 2.892 0 0 0-.835-.039m.762 1.075c.177.087.402.316.484.492.048.105.058.175.058.407 0 .251-.007.295-.072.428a1.019 1.019 0 0 1-1.053.558 1.039 1.039 0 0 1-.747-.556 1.157 1.157 0 0 1-.051-.729c.08-.274.335-.541.612-.64.211-.075.572-.056.769.04m6.829.865.74.74v6.307H1.013V11.24l.768-.576.768-.576.999.501a21.14 21.14 0 0 0 1.039.503c.022.001 1.36-1.319 2.973-2.932a479.726 479.726 0 0 1 2.946-2.933c.008 0 .347.333.754.739'
      />
    </svg>
  )
})

SvgImageGallery16.displayName = 'SvgImageGallery16'
export default SvgImageGallery16
