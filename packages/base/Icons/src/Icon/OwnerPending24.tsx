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
const SvgOwnerPending24 = forwardRef(function SvgOwnerPending24(
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
        d='M20.503 1.04c-1.032.187-1.947.936-2.301 1.885-.103.276-.2.723-.201.925L18 4h.991l.028-.223a2.001 2.001 0 0 1 2.856-1.57c.354.168.749.562.916.913a1.999 1.999 0 0 1-1.329 2.819c-.164.042-.432.061-.85.061H20v2h1v-.989l.27-.025a3.116 3.116 0 0 0 1.376-.482c1.523-1.026 1.802-3.118.6-4.484-.349-.396-.97-.781-1.49-.923-.265-.073-.986-.106-1.253-.057M3.433 9.043a4.302 4.302 0 0 0-1.702.669c-.775.527-1.335 1.322-1.602 2.277l-.109.391v3.24l.111.397c.421 1.509 1.576 2.591 3.095 2.9.373.076.546.083 2.084.083h1.678l.026.33c.058.748.382 1.561.856 2.151a3.916 3.916 0 0 0 2.356 1.436c.398.081.511.083 5.274.083s4.876-.002 5.274-.083a4.004 4.004 0 0 0 3.097-2.905l.108-.392v-3.24l-.106-.385c-.329-1.197-1.076-2.081-2.21-2.619-.711-.337-.795-.347-2.847-.366l-1.805-.016-.024-.307a4.032 4.032 0 0 0-1.718-2.975 5.094 5.094 0 0 0-1.311-.599l-.338-.09-4.98-.007c-2.739-.004-5.082.008-5.207.027M20 9.5v.5h1V9h-1v.5m-6.244.589c.617.191 1.201.576 1.574 1.038.365.453.67 1.252.67 1.755v.114l-2.81.014c-2.756.014-2.817.016-3.148.104a4.062 4.062 0 0 0-2.907 2.854c-.093.33-.107.465-.124 1.202l-.02.83-1.646-.001c-1.741 0-1.923-.016-2.42-.201-.706-.263-1.287-.813-1.627-1.538-.273-.581-.278-.623-.278-2.26 0-1.637.005-1.679.278-2.26a3.015 3.015 0 0 1 2.205-1.698c.108-.019 2.411-.03 5.117-.027 4.47.007 4.94.014 5.136.074M16 14.616c0 .762-.07 1.165-.284 1.622-.424.906-1.164 1.495-2.138 1.702-.229.048-.749.059-2.933.059L7.991 18l.02-.77c.023-.857.054-1.013.301-1.526a3.035 3.035 0 0 1 2.191-1.662c.108-.018 1.39-.035 2.847-.037L16 14v.616m4.756-.525c.879.264 1.569.848 1.948 1.649.262.555.296.811.296 2.26 0 1.429-.035 1.705-.284 2.238-.424.906-1.164 1.495-2.138 1.702-.413.087-9.74.088-10.153 0-.977-.207-1.708-.784-2.127-1.68-.186-.399-.241-.59-.281-.99L7.989 19h2.689c2.561 0 2.709-.004 3.096-.083a3.994 3.994 0 0 0 3.094-2.905c.092-.344.106-.491.122-1.205l.018-.812 1.766.015c1.483.014 1.801.026 1.982.081'
      />
    </svg>
  )
})

SvgOwnerPending24.displayName = 'SvgOwnerPending24'
export default SvgOwnerPending24
