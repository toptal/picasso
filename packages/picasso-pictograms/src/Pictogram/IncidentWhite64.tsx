import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgIncidentWhite64 = forwardRef(function SvgIncidentWhite64(
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
      viewBox='0 0 64 66'
      className={className}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <g clipPath='url(#a)'>
        <path
          fill='#231F20'
          d='M48.828 26.69A12.562 12.562 0 0 1 38.723 6.663l-8.833-5.1-27.28 15.75v31.5l27.28 15.75 27.28-15.75V23.516a12.513 12.513 0 0 1-8.342 3.173Zm-15.251-5.24L32.04 34.757H27.74L26.204 21.45h7.373Zm-3.687 25.4a4.096 4.096 0 1 1 0-8.192 4.096 4.096 0 0 1 0 8.192Z'
          opacity={0.3}
        />
        <path
          fill='#fff'
          d='M29.89 65.141 2.11 49.103V17.026L29.89.987l9.039 5.218-.5.866-8.539-4.93L3.11 17.603v30.923l26.78 15.461 26.78-15.46v-24.98h1v25.556L29.89 65.141Z'
        />
        <path
          fill='#fff'
          d='M32.486 35.256h-5.192l-1.651-14.305h8.495l-1.652 14.305Zm-4.3-1h3.409l1.42-12.305h-6.25l1.42 12.305ZM29.89 47.35a4.597 4.597 0 1 1 4.596-4.596 4.601 4.601 0 0 1-4.596 4.596Zm0-8.192a3.595 3.595 0 1 0 0 7.19 3.595 3.595 0 0 0 0-7.19ZM48.819 27.18a13.054 13.054 0 1 1 13.054-13.053A13.069 13.069 0 0 1 48.82 27.18Zm0-25.107a12.054 12.054 0 1 0 12.054 12.054A12.068 12.068 0 0 0 48.82 2.073Z'
        />
        <path
          fill='#fff'
          d='m48.159 17.45-3.638-3.638.707-.707 2.931 2.931 4.408-4.408.707.707-5.115 5.115Z'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 .987h64v64.154H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgIncidentWhite64.displayName = 'SvgIncidentWhite64'
export default SvgIncidentWhite64
