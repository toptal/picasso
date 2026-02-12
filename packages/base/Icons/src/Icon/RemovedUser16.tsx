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
const SvgRemovedUser16 = forwardRef(function SvgRemovedUser16(
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
        d='M7.47.03a5.029 5.029 0 0 0-3.967 2.787A5 5 0 0 0 4.56 8.622c.395.376.318.38.729-.032l.351-.352-.12-.098c-1.175-.964-1.71-2.387-1.452-3.859.28-1.591 1.528-2.858 3.159-3.206.323-.069 1.223-.069 1.546 0 .915.195 1.744.69 2.307 1.378l.156.191.354-.354.354-.353-.057-.079c-.2-.281-.707-.74-1.127-1.02A5.02 5.02 0 0 0 7.47.03m.17 7.623L.787 14.507l.353.353.353.353 6.86-6.86 6.86-6.859-.346-.347a6.274 6.274 0 0 0-.36-.347c-.008 0-3.098 3.084-6.867 6.853m4.729-1.9c-.594.597-.605.611-.7.833a4.068 4.068 0 0 1-2.207 2.135c-.07.025-.276.213-.72.657C8.4 9.72 8.138 10 8.16 10c.022 0 .184.013.36.028a5.969 5.969 0 0 1 4.854 3.319c.37.748.562 1.483.615 2.353l.019.3h1.005l-.015-.247c-.063-1.089-.297-2.005-.737-2.883a7.053 7.053 0 0 0-3.845-3.44c-.039-.014-.005-.045.17-.151a5.035 5.035 0 0 0 2.32-3.32c.052-.267.104-.812.078-.812-.006 0-.283.273-.615.606'
      />
    </svg>
  )
})

SvgRemovedUser16.displayName = 'SvgRemovedUser16'
export default SvgRemovedUser16
