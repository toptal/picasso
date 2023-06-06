import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgInteractionBlue64 = forwardRef(function SvgInteractionBlue64(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const { className, style = {}, scale, base, 'data-testid': testId } = props
  const scaledSize = base || SIZE * Math.ceil(scale || 1)

  const svgStyle = {
    minWidth: `${scaledSize}px`,
    minHeight: `${scaledSize}px`,
    ...style,
  }

  return (
    <svg
      fill='none'
      viewBox='0 0 64 64'
      className={className}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <g clipPath='url(#a)'>
        <path
          fill='#183A9E'
          d='M24.44 27.4v-9.807a3.484 3.484 0 0 1 6.969 0v9.716l.255-.003a10.387 10.387 0 1 0-7.224.094ZM41.225 51.378H24.44v5.605h16.785v-5.605Z'
          opacity={0.15}
        />
        <path
          fill='#204ECF'
          d='M41.726 56.983h-1v-5.342l.212-.15a9.764 9.764 0 0 0 4.15-7.975v-7.684a3.86 3.86 0 0 0-.387-1.68 2.548 2.548 0 0 0-3.28-1.228l-.987.418-.384-.913a2.545 2.545 0 0 0-3.365-1.346l-.869.379-.33-.674a2.546 2.546 0 0 0-3.416-1.168l-1.16.575V17.593a2.984 2.984 0 0 0-5.97 0V31.45l-3.378 2.177a7.296 7.296 0 0 0-2.68 9.084l1.411 3.123a15.168 15.168 0 0 0 4.456 5.673l.191.15v5.326h-1v-4.841a16.172 16.172 0 0 1-4.56-5.896l-1.41-3.123a8.304 8.304 0 0 1 3.052-10.337l2.918-1.88V17.592a3.985 3.985 0 0 1 7.97 0v11.006a3.544 3.544 0 0 1 4.378 1.566 3.547 3.547 0 0 1 4.679 1.865l.063-.027a3.545 3.545 0 0 1 4.57 1.71c.32.661.488 1.385.489 2.119v7.684a10.763 10.763 0 0 1-4.363 8.64v4.827Z'
        />
        <path fill='#204ECF' d='M24.94 31.178h-1v6.31h1v-6.31Z' />
        <path
          fill='#204ECF'
          d='M32 64a32 32 0 1 1 32-32 32.036 32.036 0 0 1-32 32Zm0-63a31 31 0 1 0 31 31A31.035 31.035 0 0 0 32 1Z'
        />
        <path
          fill='#204ECF'
          d='M24.273 27.872a10.888 10.888 0 1 1 7.57-.1l-.36-.932a9.887 9.887 0 1 0-6.875.09l-.335.942Z'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgInteractionBlue64.displayName = 'SvgInteractionBlue64'
export default SvgInteractionBlue64
