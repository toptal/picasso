import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgDocumentErrorWhite64 = forwardRef(function SvgDocumentErrorWhite64(
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
      <path
        fill='#000'
        d='M27.42 36.5h-4.84l-3.46-18h11.76l-3.46 18ZM25 48.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM50 58H1v5h49v-5ZM39 1v11h11L39 1ZM50 51.5l-5.31-3.19-1.19 1.19-6 2L50 58v-6.5Z'
        opacity={0.3}
      />
      <path
        stroke='#fff'
        strokeMiterlimit={10}
        d='M27.42 36.5h-4.84l-3.46-18h11.76l-3.46 18ZM25 48.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z'
      />
      <path
        stroke='#fff'
        strokeMiterlimit={10}
        d='M50.5 29V12.5l-12-12H.5v63h50v-21'
      />
      <path
        stroke='#fff'
        strokeMiterlimit={10}
        d='M38.5 1v11.5H50M58.5 26.5l-19 19-2 6 6-2 19-19c1.1-1.1 1.1-2.9 0-4s-2.9-1.1-4 0Z'
      />
    </svg>
  )
})

SvgDocumentErrorWhite64.displayName = 'SvgDocumentErrorWhite64'
export default SvgDocumentErrorWhite64
