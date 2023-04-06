import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgInteractionWhite64 = forwardRef(function SvgInteractionWhite64(
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
      viewBox='0 0 64 64'
      fill='none'
      className={className}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <g clipPath='url(#a)'>
        <path
          opacity={0.3}
          d='M24.44 28.387V18.58a3.484 3.484 0 0 1 6.969 0v9.716l.255-.003a10.387 10.387 0 1 0-7.224.094ZM41.225 52.365H24.44v5.605h16.785v-5.605Z'
          fill='#231F20'
        />
        <path
          d='M41.726 57.97h-1v-5.342l.212-.15a9.762 9.762 0 0 0 4.15-7.975V36.82c0-.582-.133-1.156-.387-1.68a2.548 2.548 0 0 0-3.28-1.228l-.987.418-.384-.913a2.547 2.547 0 0 0-3.365-1.346l-.869.379-.33-.674a2.545 2.545 0 0 0-3.416-1.168l-1.16.575V18.58a2.984 2.984 0 0 0-5.97 0v13.857l-3.378 2.177a7.296 7.296 0 0 0-2.68 9.084l1.411 3.123a15.167 15.167 0 0 0 4.456 5.673l.191.15v5.326h-1v-4.841a16.173 16.173 0 0 1-4.56-5.896l-1.41-3.123a8.304 8.304 0 0 1 3.052-10.337l2.918-1.88V18.58a3.984 3.984 0 0 1 7.97 0v11.006a3.545 3.545 0 0 1 4.378 1.566 3.546 3.546 0 0 1 4.679 1.865l.063-.027a3.545 3.545 0 0 1 4.57 1.71c.32.661.488 1.385.489 2.12v7.683a10.763 10.763 0 0 1-4.363 8.64v4.827Z'
          fill='#fff'
        />
        <path d='M24.94 32.165h-1v6.31h1v-6.31Z' fill='#fff' />
        <path
          d='M32 64.987a32 32 0 1 1 32-32 32.036 32.036 0 0 1-32 32Zm0-63a31 31 0 1 0 31 31 31.035 31.035 0 0 0-31-31Z'
          fill='#fff'
        />
        <path
          d='M24.273 28.859a10.888 10.888 0 1 1 7.57-.1l-.36-.932a9.888 9.888 0 1 0-6.875.09l-.335.942Z'
          fill='#fff'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' transform='translate(0 .987)' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgInteractionWhite64.displayName = 'SvgInteractionWhite64'
export default SvgInteractionWhite64
