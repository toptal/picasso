import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgTeamBusinessWhite64 = forwardRef(function SvgTeamBusinessWhite64(
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
          fill='#000'
          d='m48 48-3 10v3.59c1.88 1.33 4.16 1.91 6.61 1.91 2.8 0 5.38-.94 7.39-2.63V58H49zM12.5.5C5.87.5.5 5.87.5 12.5s5.37 12 12 12 12-5.37 12-12-5.37-12-12-12m5 17.5h-10v-.5c0-2.76 2.24-5 5-5-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3c2.76 0 5 2.24 5 5zm39 0h-10v-.5c0-2.76 2.24-5 5-5-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3c2.76 0 5 2.24 5 5z'
          opacity={0.3}
        />
        <path
          fill='#fff'
          fillRule='evenodd'
          d='M12.5 6a3.5 3.5 0 0 0-1.998 6.374A5.5 5.5 0 0 0 7 17.5v.5h1v-.5c0-2.484 2.016-4.5 4.5-4.5s4.5 2.016 4.5 4.5v.5h1v-.5a5.5 5.5 0 0 0-3.502-5.126A3.5 3.5 0 0 0 12.5 6m0 6a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5m39-6a3.5 3.5 0 0 0-1.998 6.374A5.5 5.5 0 0 0 46 17.5v.5h1v-.5c0-2.484 2.016-4.5 4.5-4.5s4.5 2.016 4.5 4.5v.5h1v-.5a5.5 5.5 0 0 0-3.502-5.126A3.5 3.5 0 0 0 51.5 6m0 6a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5'
          clipRule='evenodd'
        />
        <path
          fill='#fff'
          d='m59 47.162-11-4.4v3.47l-3 2V58h1v-9.232l2-1.334V61h1V44.239l9 3.6V58h1z'
        />
        <path
          fill='#fff'
          fillRule='evenodd'
          d='M51 51v-2h1v2zm2 0v-2h1v2zm2 0v-2h1v2zm-4 4v-2h1v2zm2 0v-2h1v2zm2 0v-2h1v2zm-4 4v-2h1v2zm2 0v-2h1v2zm2 0v-2h1v2zM12.5 0C5.596 0 0 5.596 0 12.5S5.596 25 12.5 25c6.736 0 12.228-5.328 12.49-12h10.303l-2.146 2.146.707.708 3.353-3.354-3.353-3.354-.707.708L35.293 12H24.99C24.728 5.328 19.236 0 12.5 0M24 12.5C24 6.149 18.851 1 12.5 1S1 6.149 1 12.5 6.149 24 12.5 24 24 18.851 24 12.5m15 0C39 5.596 44.596 0 51.5 0S64 5.596 64 12.5c0 6.736-5.328 12.228-12 12.49v10.303l2.147-2.146.707.707-3.354 3.353-3.353-3.353.707-.707L51 35.293V24.99c-6.672-.262-12-5.754-12-12.49M51.5 1C45.149 1 40 6.149 40 12.5S45.149 24 51.5 24 63 18.851 63 12.5 57.851 1 51.5 1'
          clipRule='evenodd'
        />
        <path
          fill='#fff'
          fillRule='evenodd'
          d='M28.707 52H39.01c.262 6.672 5.754 12 12.49 12C58.404 64 64 58.404 64 51.5S58.404 39 51.5 39c-6.736 0-12.228 5.328-12.49 12H28.707l2.147-2.146-.707-.707-3.354 3.353 3.354 3.354.707-.707zM51.5 63C45.149 63 40 57.851 40 51.5S45.149 40 51.5 40 63 45.149 63 51.5 57.851 63 51.5 63M15.854 30.147 12.5 26.793l-3.354 3.354.708.707L12 28.707V39.01c-6.672.262-12 5.754-12 12.49C0 58.404 5.596 64 12.5 64S25 58.404 25 51.5c0-6.736-5.328-12.228-12-12.49V28.707l2.146 2.147zM1 51.5C1 45.149 6.149 40 12.5 40S24 45.149 24 51.5 18.851 63 12.5 63 1 57.851 1 51.5m37.854-22.646L30.5 37.207l-4.353-4.354.707-.707 3.646 3.647 7.647-7.647z'
          clipRule='evenodd'
        />
        <path
          fill='#fff'
          fillRule='evenodd'
          d='M12 57v2h1v-2h2a3 3 0 0 0 0-6h-2v-4h2a2 2 0 0 1 2 2h1c0-1.656-1.344-3-3-3h-2v-2h-1v2h-2a3 3 0 0 0 0 6h2v4h-2a2 2 0 0 1-2-2H7a3 3 0 0 0 3 3zm1-1h2a2 2 0 0 0 0-4h-2zm-1-5v-4h-2a2 2 0 0 0 0 4z'
          clipRule='evenodd'
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

SvgTeamBusinessWhite64.displayName = 'SvgTeamBusinessWhite64'
export default SvgTeamBusinessWhite64
