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
const SvgBulb16 = forwardRef(function SvgBulb16(
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
        d='M7.56.016c-.876.091-1.5.26-2.187.596A5.992 5.992 0 0 0 2.04 5.328c-.259 2.212.786 4.454 2.638 5.66l.305.199.008 1.906L5 15l.507.007.508.007.492.493.492.493h2.002l.492-.493.492-.493.508-.007L11 15l.009-1.907.008-1.906.305-.199C12.975 9.911 14 7.999 14 5.99c0-1.566-.642-3.11-1.756-4.225a5.946 5.946 0 0 0-1.615-1.15A5.76 5.76 0 0 0 8.88.067C8.608.026 7.775-.006 7.56.016m1.387 1.076c2.022.406 3.553 1.94 3.964 3.975.055.271.062.379.061.946-.001.591-.006.666-.072.974a4.96 4.96 0 0 1-.917 2.027c-.445.592-.954 1.022-1.723 1.458l-.26.147v.394h-.404l.015-.073c.049-.237.976-5.373.976-5.406 0-.036-.286-.041-2.587-.041s-2.587.005-2.587.041c0 .033.927 5.169.976 5.406l.015.073H6v-.394l-.262-.148C4.677 9.87 4.02 9.201 3.535 8.227A4.576 4.576 0 0 1 3.1 6.991c-.067-.313-.072-.384-.073-.978 0-.565.007-.675.062-.946C3.527 2.896 5.25 1.298 7.44 1.03c.051-.006.345-.008.653-.004.45.006.618.019.854.066m.44 5.448c0 .062-.798 4.422-.814 4.448-.019.03-1.16.036-1.16.005 0-.011-.18-1.01-.4-2.22-.22-1.209-.4-2.214-.4-2.233 0-.026.291-.033 1.387-.033s1.387.007 1.387.033M10 13v1h-.414l-.506.507-.506.506H7.426l-.506-.506L6.414 14H6v-2h4v1'
      />
    </svg>
  )
})

SvgBulb16.displayName = 'SvgBulb16'
export default SvgBulb16
