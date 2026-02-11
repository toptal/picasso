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
const SvgStrikethrough24 = forwardRef(function SvgStrikethrough24(
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
        d='M11.08 2.044c-2.596.24-4.874 1.569-5.702 3.328-.074.159-.184.45-.243.648-.098.324-.109.423-.111 1-.003.673.028.893.202 1.44.29.911.976 1.787 1.863 2.379l.24.161 1.206-.002 1.205-.002-.36-.132c-1.578-.578-2.519-1.293-3.023-2.299-.246-.494-.332-.884-.332-1.525-.001-.486.01-.572.109-.86.187-.541.401-.875.866-1.344.452-.457.83-.732 1.389-1.013 1.135-.569 2.179-.8 3.611-.799.88 0 1.373.056 2.08.234 1.199.304 2.129.798 2.888 1.534l.389.377.351-.271c.194-.149.368-.285.388-.303.052-.045-.359-.501-.727-.807-1.068-.89-2.415-1.455-4.029-1.691-.511-.075-1.717-.103-2.26-.053M3 12.5v.5h11.24l.45.165c1.795.656 2.865 1.634 3.197 2.921.116.451.126 1.225.02 1.574-.1.326-.32.752-.528 1.019-1.733 2.228-6.098 2.996-9.429 1.657-.812-.327-1.418-.714-1.976-1.264-.228-.226-.342-.312-.38-.289-.095.058-.714.548-.714.566 0 .051.418.487.686.716 2.525 2.156 7.171 2.57 10.45.931 1.528-.764 2.549-1.883 2.88-3.156.093-.36.124-1.027.068-1.451-.177-1.319-.85-2.392-2.001-3.185L16.666 13H21v-1H3v.5'
      />
    </svg>
  )
})

SvgStrikethrough24.displayName = 'SvgStrikethrough24'
export default SvgStrikethrough24
