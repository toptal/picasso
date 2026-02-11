import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgCalendarDateCheckBlue64 = forwardRef(
  function SvgCalendarDateCheckBlue64(props: Props, ref: Ref<SVGSVGElement>) {
    const { className, style = {}, scale, base, 'data-testid': testId } = props
    const scaledSize = base || SIZE * Math.ceil(scale || 1)

    const svgStyle = {
      minWidth: `${scaledSize}px`,
      minHeight: `${scaledSize}px`,
      ...style,
    }

    return (
      <svg
        fill='none'
        viewBox='0 0 64 64'
        className={className}
        style={svgStyle}
        ref={ref}
        data-testid={testId}
      >
        <path
          stroke='#204ECF'
          strokeMiterlimit={10}
          d='M6.976 54.783C1.578 44.373 1.193 6.976 1.193 6.976H56.71s0 37.398 5.397 47.807H6.976Z'
        />
        <path
          stroke='#204ECF'
          strokeMiterlimit={10}
          d='M1.193 6.976v55.518H56.71v-7.71'
        />
        <path
          fill='#183A9E'
          d='M6.976 54.783c-3.894-7.48-5.166-32.617-5.59-41.831v45.494h55.132v-3.663H6.976Z'
          opacity={0.15}
        />
        <path
          fill='#183A9E'
          d='M42.253 27.602 29.145 40.711l-8.097-8.097 2.314-2.313 5.783 5.783L39.94 25.29l2.313 2.313Z'
          opacity={0.15}
        />
        <path
          stroke='#204ECF'
          strokeMiterlimit={10}
          d='M42.253 27.602 29.145 40.711l-8.097-8.097 2.314-2.313 5.783 5.783L39.94 25.29l2.313 2.313ZM6.205 5.434c.385-2.545 1.658-4.241 3.47-4.241 2.12 0 3.855 2.583 3.855 5.783s-1.735 5.783-3.855 5.783M18.928 5.434c.385-2.545 1.658-4.241 3.47-4.241 2.12 0 3.855 2.583 3.855 5.783s-1.735 5.783-3.855 5.783M31.65 5.434c.386-2.545 1.658-4.241 3.47-4.241 2.12 0 3.856 2.583 3.856 5.783s-1.735 5.783-3.855 5.783M43.988 5.434c.386-2.545 1.658-4.241 3.47-4.241 2.12 0 3.855 2.583 3.855 5.783s-1.735 5.783-3.855 5.783'
        />
      </svg>
    )
  }
)

SvgCalendarDateCheckBlue64.displayName = 'SvgCalendarDateCheckBlue64'
export default SvgCalendarDateCheckBlue64
