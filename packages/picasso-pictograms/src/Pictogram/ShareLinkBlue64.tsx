import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgShareLinkBlue64 = forwardRef(function SvgShareLinkBlue64(
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
      <circle cx={32} cy={32.5} r={32} fill='#EDF1FD' />
      <g opacity={0.89}>
        <path
          fill='#183A9E'
          d='M32 32.781a4.219 4.219 0 1 0 0-8.437 4.219 4.219 0 0 0 0 8.437Z'
          opacity={0.15}
        />
        <path
          fill='#183A9E'
          d='M32 32.781a7.594 7.594 0 0 0-7.594 7.594h15.188c0-4.194-3.4-7.594-7.594-7.594Z'
          opacity={0.15}
        />
        <path
          fill='#204ECF'
          d='M40.719 48.25H23.28a7.04 7.04 0 0 1-7.031-7.031V23.78a7.04 7.04 0 0 1 7.031-7.031h11.532v.563H23.28a6.476 6.476 0 0 0-6.468 6.468V41.22a6.476 6.476 0 0 0 6.468 6.468H40.72a6.476 6.476 0 0 0 6.468-6.468V29.687h.563V41.22a7.04 7.04 0 0 1-7.031 7.031Z'
          opacity={0.89}
        />
        <path
          fill='#183A9E'
          d='M47.469 24.063V17.03h-7.032l7.032 7.032Z'
          opacity={0.15}
        />
        <path
          fill='#204ECF'
          d='M47.75 24.741 39.76 16.75h7.991v7.991Zm-6.633-7.428 6.07 6.07v-6.07h-6.07Z'
          opacity={0.89}
        />
        <path
          fill='#204ECF'
          d='m43.613 20.488-3.656 3.657.398.397 3.656-3.656-.398-.398ZM32 33.063a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Zm0-8.438a3.938 3.938 0 1 0 0 7.875 3.938 3.938 0 0 0 0-7.875Z'
          opacity={0.89}
        />
        <path
          fill='#204ECF'
          d='M39.875 40.375h-.563a7.312 7.312 0 1 0-14.624 0h-.563a7.875 7.875 0 0 1 15.75 0Z'
          opacity={0.89}
        />
      </g>
    </svg>
  )
})

SvgShareLinkBlue64.displayName = 'SvgShareLinkBlue64'
export default SvgShareLinkBlue64
