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
const SvgStrikethrough16 = forwardRef(function SvgStrikethrough16(
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
        d='M7.14 1.054c-1.318.159-2.468.67-3.235 1.437-.673.673-.971 1.442-.89 2.296.076.803.432 1.479 1.076 2.042l.211.184h1.014c.558 0 1.003-.009.989-.021a2.662 2.662 0 0 0-.265-.125c-.892-.383-1.543-.914-1.834-1.494-.179-.358-.246-.824-.169-1.186.109-.515.492-1.015 1.07-1.394 1.808-1.189 4.828-1.006 6.259.379l.208.203.366-.299c.201-.164.37-.313.376-.331.017-.051-.491-.527-.757-.708-.798-.546-1.669-.859-2.732-.984a9.798 9.798 0 0 0-1.687.001M2 8.507v.506H9.671l.169.069c.934.38 1.656.95 1.954 1.545.237.474.265 1.043.069 1.455-.442.935-1.714 1.627-3.436 1.869-.385.054-1.53.046-1.934-.013-1.182-.174-2.142-.561-2.802-1.132l-.189-.163-.349.325c-.191.179-.349.339-.351.356-.004.05.415.399.732.611 1.517 1.013 3.953 1.342 6.023.813 1.132-.289 2.017-.764 2.645-1.419.26-.271.407-.483.561-.807.286-.604.311-1.309.072-2.015-.168-.497-.541-1.02-.993-1.396l-.118-.098H14V8H2v.507'
      />
    </svg>
  )
})

SvgStrikethrough16.displayName = 'SvgStrikethrough16'
export default SvgStrikethrough16
