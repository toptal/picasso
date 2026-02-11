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
const SvgChef16 = forwardRef(function SvgChef16(
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
        d='M8.373.016c-.511.06-.987.197-1.386.397a3.42 3.42 0 0 0-.668.418l-.201.153-.233-.08C5.469.761 5.16.712 4.653.711c-.536-.002-.807.04-1.28.198A3.9 3.9 0 0 0 .92 3.369c-.159.479-.187.664-.186 1.258 0 .588.023.745.18 1.215l.088.261-.129.155c-.3.361-.579.901-.724 1.402a3.935 3.935 0 0 0 .509 3.232c.23.349.725.847 1.072 1.077a3.91 3.91 0 0 0 3.694.365l.216-.09 1.093 1.091 1.094 1.092 3.306-3.307 3.307-3.307-1.096-1.1-1.096-1.1.101-.24c.249-.59.341-1.304.252-1.96A3.888 3.888 0 0 0 10.457.415a4.164 4.164 0 0 0-1.03-.349c-.235-.042-.869-.072-1.054-.05M9.441 1.09a2.94 2.94 0 0 1 1.885 1.532c.209.422.301.825.3 1.308-.002.527-.084.836-.398 1.495l-.19.399.994.995.994.994-2.599 2.6-2.6 2.6-.992-.992-.993-.992-.421.204c-.646.313-.961.399-1.474.401a2.827 2.827 0 0 1-2.034-.804 2.819 2.819 0 0 1-.9-2.105c0-.494.085-.865.297-1.292.14-.283.273-.473.549-.783.129-.145.25-.284.27-.309.03-.038.013-.101-.124-.44a6.153 6.153 0 0 1-.204-.577A2.939 2.939 0 0 1 3.422 1.96c.112-.052.32-.127.464-.167.242-.067.296-.072.754-.071.574.001.684.024 1.278.265.199.08.375.146.391.146.016 0 .16-.115.32-.256.341-.301.507-.418.798-.563.244-.122.486-.206.75-.261.272-.057.997-.035 1.264.037m2.525 10.877-3.3 3.3.354.353.354.353 3.306-3.306 3.306-3.307-.346-.346a6.274 6.274 0 0 0-.36-.347c-.007 0-1.498 1.485-3.314 3.3'
      />
    </svg>
  )
})

SvgChef16.displayName = 'SvgChef16'
export default SvgChef16
