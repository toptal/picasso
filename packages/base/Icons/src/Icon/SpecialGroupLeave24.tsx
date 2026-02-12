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
const SvgSpecialGroupLeave24 = forwardRef(function SvgSpecialGroupLeave24(
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
        d='M10.384 5.27a288.606 288.606 0 0 1-1.618 3.259c-.015.016-1.584.254-3.487.53-1.902.275-3.519.514-3.592.531l-.132.03 2.602 2.535c1.432 1.394 2.602 2.555 2.601 2.58-.001.025-.277 1.638-.613 3.585a248.049 248.049 0 0 0-.6 3.555c.006.008 1.454-.744 3.216-1.67A217.764 217.764 0 0 1 12 18.52c.018 0 .603.299 1.299.665.696.365 1.273.656 1.282.647.01-.01-.082-.313-.203-.675l-.221-.657-1.054-.55c-.58-.302-1.077-.55-1.105-.55-.027 0-1.183.596-2.567 1.324-1.385.727-2.526 1.314-2.536 1.304-.011-.011.199-1.293.466-2.85l.486-2.83-.134-.13L5.66 12.22a155.227 155.227 0 0 1-1.931-1.895c-.008-.022 5.566-.853 5.673-.846.013 0 .597-1.16 1.298-2.579.701-1.419 1.286-2.58 1.3-2.58.014 0 .365.687.78 1.527l.755 1.527.225-.675.226-.676-.981-1.992C12.466 2.936 12.013 2.04 12 2.04c-.014 0-.741 1.453-1.616 3.23m7.766 2.88-.35.35 1.75 1.75L21.3 12H10v1h11.3l-1.751 1.751-1.75 1.75.351.349.351.349 2.349-2.349 2.35-2.35-2.35-2.35L18.5 7.8l-.35.35'
      />
    </svg>
  )
})

SvgSpecialGroupLeave24.displayName = 'SvgSpecialGroupLeave24'
export default SvgSpecialGroupLeave24
