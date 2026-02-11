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
const SvgMention16 = forwardRef(function SvgMention16(
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
        d='M7.467.019c-.27.016-.784.089-1.12.158C3.324.796.878 3.204.2 6.228.047 6.91.017 7.206.017 8S.047 9.09.2 9.772a8.017 8.017 0 0 0 2.995 4.621c1.062.806 2.286 1.312 3.711 1.534.534.083 1.662.082 2.214-.003.61-.094 1.393-.303 1.857-.497l.085-.036-.189-.457c-.148-.358-.198-.455-.231-.445l-.349.121a7.005 7.005 0 0 1-4.853-.096 7.015 7.015 0 0 1-4.213-4.767c-.168-.664-.2-.94-.2-1.747 0-.807.032-1.083.2-1.747a7.006 7.006 0 0 1 5.026-5.026c.664-.168.94-.2 1.747-.2.807 0 1.083.032 1.747.2a7.008 7.008 0 0 1 5.037 5.068c.173.703.183.818.196 2.164.007.84.002 1.264-.019 1.363-.073.351-.344.738-.659.941a1.513 1.513 0 0 1-1.515.055c-.313-.165-.621-.547-.735-.911-.023-.075-.039-.459-.052-1.267-.016-1.048-.024-1.185-.076-1.422-.281-1.284-1.059-2.273-2.227-2.833-.548-.263-1.033-.368-1.697-.369-.659-.001-1.146.105-1.697.369-1.169.56-1.943 1.544-2.229 2.835-.084.377-.084 1.183 0 1.56.199.897.64 1.658 1.289 2.225a4 4 0 0 0 5.628-.355c.087-.101.168-.187.179-.191.011-.003.055.068.098.159.259.549.816 1.039 1.412 1.243a2.505 2.505 0 0 0 3.27-1.874c.043-.21.049-.371.05-1.294 0-1.099-.019-1.448-.109-1.993a7.985 7.985 0 0 0-3.424-5.332 8.02 8.02 0 0 0-5-1.349m1.07 5.033a3.023 3.023 0 0 1 2.411 2.411c.08.459.037 1.072-.103 1.484a3 3 0 0 1-5.69 0c-.191-.56-.19-1.335.002-1.898.143-.419.417-.862.724-1.168a3.11 3.11 0 0 1 1.568-.828 4.17 4.17 0 0 1 1.088-.001'
      />
    </svg>
  )
})

SvgMention16.displayName = 'SvgMention16'
export default SvgMention16
