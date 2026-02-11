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
const SvgTip24 = forwardRef(function SvgTip24(
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
        d='M11.44 1.96v1.96h.96V0h-.96v1.96m6.989 2.831-1.31 1.31.351.349.351.349 1.31-1.31 1.31-1.31-.351-.349-.351-.349-1.31 1.31M4.045 3.972c-.308.312-.331.346-.28.418.03.043.577.611 1.216 1.264L6.142 6.84l.348-.35.348-.35-1.229-1.254L4.38 3.633l-.335.339m7.115 1.085C9.707 5.268 8.382 5.929 7.267 7c-.518.497-.8.834-1.164 1.389a6.626 6.626 0 0 0-.882 5.35c.355 1.366 1.019 2.446 2.173 3.532.63.594.862.891 1.146 1.469.364.739.457 1.24.459 2.47L9 22h5.99l.022-1.01c.023-1.109.058-1.352.286-1.96.259-.693.59-1.131 1.398-1.85 2.322-2.067 2.968-5.5 1.562-8.305-1.012-2.019-2.892-3.402-5.138-3.78-.501-.085-1.504-.104-1.96-.038m1.601 1.001a5.95 5.95 0 0 1 3.743 1.989c2.105 2.386 1.955 6.073-.336 8.251-.876.833-1.088 1.059-1.306 1.393-.537.825-.808 1.701-.851 2.759l-.023.55h-3.976l-.025-.55c-.069-1.543-.71-2.862-1.897-3.902a6.08 6.08 0 0 1-1.974-3.388c-.12-.565-.131-1.651-.023-2.155a6.38 6.38 0 0 1 1.018-2.324c.303-.426.977-1.128 1.369-1.425 1.306-.987 2.775-1.399 4.281-1.198M1 12.5v.5h3v-1H1v.5m19 0v.5h3v-1h-3v.5M9.019 23.148c.059.316.262.586.56.746.159.085.185.086 2.421.086 2.236 0 2.262-.001 2.421-.086.298-.16.501-.43.56-.746l.028-.148H8.991l.028.148'
      />
    </svg>
  )
})

SvgTip24.displayName = 'SvgTip24'
export default SvgTip24
