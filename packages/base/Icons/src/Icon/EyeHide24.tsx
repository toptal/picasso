import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { getColorClass } from './styles'

const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
  classes?: {
    root?: string
  }
}
const SvgEyeHide24 = forwardRef(function SvgEyeHide24(
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
      viewBox='0 0 24 24'
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
        d='m11.649 11.651-9.85 9.85.351.349.351.349 9.85-9.85 9.85-9.85-.351-.349-.351-.349-9.85 9.85M11.3 4.027c-1.621.134-2.86.483-4.288 1.209-2.39 1.213-4.62 3.32-6.746 6.374l-.272.39.271.39c.977 1.409 2.053 2.695 3.101 3.71.565.546 1.199 1.1 1.26 1.1.072 0 .711-.679.673-.714-.022-.02-.174-.15-.339-.289a20.13 20.13 0 0 1-2.477-2.53c-.453-.55-1.243-1.608-1.243-1.666 0-.066.813-1.151 1.309-1.746 2.149-2.58 4.446-4.223 6.831-4.887a9.723 9.723 0 0 1 6.151.303l.474.182.358-.356c.196-.195.357-.367.357-.382 0-.041-.77-.369-1.24-.528-1.32-.448-2.932-.664-4.18-.56m7.701 3.112c-.209.21-.323.353-.3.375.022.02.174.15.339.289a20.13 20.13 0 0 1 2.477 2.53c.453.55 1.243 1.608 1.243 1.666 0 .066-.813 1.151-1.305 1.741-2.843 3.41-5.838 5.134-9.115 5.247a9.782 9.782 0 0 1-4.013-.709l-.332-.131-.375.373-.375.373.208.098c1.347.633 3.02 1.005 4.527 1.008 4.303.007 8.215-2.525 11.754-7.609l.272-.39-.271-.39c-.977-1.409-2.053-2.695-3.101-3.71-.565-.546-1.199-1.1-1.26-1.1-.02 0-.188.153-.373.339m-7.661-.093c-.759.097-1.693.477-2.321.946a5.007 5.007 0 0 0-1.855 5.274c.071.272.33.96.381 1.012.01.01.187-.15.393-.356l.376-.374-.072-.184c-.242-.615-.298-1.618-.128-2.302a4.196 4.196 0 0 1 1.063-1.885 4.196 4.196 0 0 1 1.885-1.063c.684-.17 1.687-.114 2.302.128l.184.072.374-.376.374-.376-.307-.141c-.749-.347-1.755-.489-2.649-.375m4.712 3.044-.367.37.06.14c.247.574.313 1.65.142 2.338a4.409 4.409 0 0 1-.968 1.796c-.894.977-2.374 1.457-3.672 1.188a5.132 5.132 0 0 1-.606-.158l-.193-.073-.372.373c-.205.205-.364.381-.354.391.01.01.172.081.36.159a5.006 5.006 0 0 0 3.512.123 4.878 4.878 0 0 0 1.856-1.132c1.301-1.242 1.825-3.037 1.404-4.805-.068-.285-.37-1.08-.41-1.08-.014 0-.191.166-.392.37'
      />
    </svg>
  )
})

SvgEyeHide24.displayName = 'SvgEyeHide24'
export default SvgEyeHide24
