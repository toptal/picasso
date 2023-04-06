import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgEmployeesWhite64 = forwardRef(function SvgEmployeesWhite64(
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
          d='M14.915 47.14a7.14 7.14 0 1 0 0-14.28 7.14 7.14 0 0 0 0 14.28ZM14.915 47.142A14.416 14.416 0 0 0 .5 61.558h28.832a14.418 14.418 0 0 0-14.416-14.416ZM49.085 18.44a7.14 7.14 0 1 0 0-14.28 7.14 7.14 0 0 0 0 14.28ZM49.085 18.442a14.416 14.416 0 0 0-14.416 14.416h28.832a14.415 14.415 0 0 0-14.416-14.416Z'
          fill='#231F20'
        />
        <path
          d='M14.915 47.64a7.64 7.64 0 1 1 7.64-7.64 7.648 7.648 0 0 1-7.64 7.64Zm0-14.281a6.64 6.64 0 1 0-.003 13.28 6.64 6.64 0 0 0 .003-13.28Z'
          fill='#fff'
        />
        <path
          d='M29.83 61.559h-1a13.916 13.916 0 1 0-27.83 0H0a14.915 14.915 0 1 1 29.83 0ZM14.915 18.94a7.64 7.64 0 1 1 7.64-7.64 7.648 7.648 0 0 1-7.64 7.64Zm0-14.282a6.64 6.64 0 1 0 6.64 6.642 6.647 6.647 0 0 0-6.64-6.642Z'
          fill='#fff'
        />
        <path
          d='M29.83 32.859h-1a13.916 13.916 0 1 0-27.83 0H0a14.915 14.915 0 1 1 29.83 0ZM49.085 18.94a7.64 7.64 0 1 1 7.64-7.64 7.65 7.65 0 0 1-7.64 7.64Zm0-14.282a6.64 6.64 0 1 0 6.64 6.642 6.647 6.647 0 0 0-6.64-6.642Z'
          fill='#fff'
        />
        <path
          d='M64 32.859h-1a13.914 13.914 0 1 0-27.83 0h-1a14.914 14.914 0 1 1 29.83 0Z'
          fill='#fff'
        />
        <path
          d='M49.085 47.64a7.64 7.64 0 1 1 7.64-7.64 7.65 7.65 0 0 1-7.64 7.64Zm0-14.281a6.64 6.64 0 1 0-.003 13.28 6.64 6.64 0 0 0 .003-13.28Z'
          fill='#fff'
        />
        <path
          d='M64 61.559h-1a13.914 13.914 0 1 0-27.83 0h-1a14.914 14.914 0 0 1 28.698-5.712A14.916 14.916 0 0 1 64 61.56Z'
          fill='#fff'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' transform='translate(0 .859)' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgEmployeesWhite64.displayName = 'SvgEmployeesWhite64'
export default SvgEmployeesWhite64
