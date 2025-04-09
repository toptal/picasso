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
const SvgLogoNoTrademark = forwardRef(function SvgLogoNoTrademark(
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
      viewBox='0 0 9 13'
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
        d='m3.125 1.2-.603.596.884.883.883.884-1.942 1.919A235.688 235.688 0 0 0 .408 7.409c.003.005 1.178 1.175 2.613 2.601l2.608 2.593.137-.133.598-.59.461-.457-.891-.893-.891-.893 1.95-1.927 1.951-1.927-1.836-1.827C6.099 2.952 4.925 1.786 4.5 1.367L3.728.604l-.603.596m2.359 3.697c.062.026.835.776.887.861.04.065.042.127.007.192-.014.026-.552.568-1.195 1.204-.839.829-1.183 1.16-1.22 1.172-.115.038-.127.03-.578-.419a8.41 8.41 0 0 1-.439-.455.23.23 0 0 1 0-.189c.012-.022.547-.562 1.191-1.198C5.41 4.804 5.362 4.846 5.484 4.897'
      />
    </svg>
  )
})

SvgLogoNoTrademark.displayName = 'SvgLogoNoTrademark'
export default SvgLogoNoTrademark
