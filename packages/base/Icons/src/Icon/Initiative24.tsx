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
const SvgInitiative24 = forwardRef(function SvgInitiative24(
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
        'stroke-current inline-block text-inherit h-[1em] align-[-.125em]',
        classes?.root,
        className,
        getColorClass(color)
      )}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path
        d='M6.3666 12.783L11.8821 6.35912L11.8659 6.3429C14.218 3.6176 17.4949 1.89807 21.0313 1.50874C21.2285 1.4859 21.4284 1.50796 21.6159 1.57325C21.8034 1.63855 21.9738 1.7454 22.1142 1.88581C22.2546 2.02622 22.3615 2.19655 22.4267 2.38408C22.492 2.57161 22.5141 2.77147 22.4913 2.96872C22.0995 6.52606 20.3717 9.80196 17.6571 12.1341L11.2332 17.6496M6.3666 12.783L11.2332 17.6496M6.3666 12.783L1.5 7.91643C1.5 7.91643 6.3666 4.67203 11.3305 6.40778M11.2332 17.6496L16.0998 22.5162C16.0998 22.5162 19.3442 17.6496 17.722 12.783M7.9888 19.2718C7.9888 19.2718 6.3666 20.894 3.1222 20.894C3.1222 17.6496 4.7444 16.0274 4.7444 16.0274'
        stroke='currentColor'
        strokeWidth='1'
        fill='none'
      />
    </svg>
  )
})

SvgInitiative24.displayName = 'SvgInitiative24'
export default SvgInitiative24
