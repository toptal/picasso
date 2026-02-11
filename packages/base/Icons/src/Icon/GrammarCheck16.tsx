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
const SvgGrammarCheck16 = forwardRef(function SvgGrammarCheck16(
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
        d='M4.126 2.086c-.02.048-.947 2.593-2.06 5.656C.466 12.146.05 13.315.079 13.333c.056.034.882.329.891.317.004-.005.299-.814.656-1.797l.66-1.82c.019-.049 5.409-.049 5.428 0l.66 1.82c.357.983.652 1.792.656 1.797.009.012.835-.283.891-.317.029-.018-.393-1.203-2.017-5.671L5.85 2.013l-.845-.007-.844-.007-.035.087m8.954 2.127-1.573 1.574-.82-.82-.82-.82-.36.36-.36.36L10.32 6.04l1.173 1.173 1.934-1.933 1.933-1.934-.353-.353-.354-.353-1.573 1.573M6.244 5.987a393.822 393.822 0 0 1 1.088 3.006c.001.011-1.049.02-2.332.02S2.667 9.007 2.667 9c0-.011 2.082-5.747 2.157-5.941.028-.072.036-.075.181-.067L5.157 3l1.087 2.987'
      />
    </svg>
  )
})

SvgGrammarCheck16.displayName = 'SvgGrammarCheck16'
export default SvgGrammarCheck16
