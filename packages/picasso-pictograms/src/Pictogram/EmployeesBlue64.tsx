import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgEmployeesBlue64 = forwardRef(function SvgEmployeesBlue64(
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
          opacity={0.15}
          d='M14.915 46.281a7.14 7.14 0 1 0 0-14.28 7.14 7.14 0 0 0 0 14.28ZM14.915 46.283A14.416 14.416 0 0 0 .5 60.7h28.832a14.417 14.417 0 0 0-14.416-14.416ZM49.085 17.581a7.14 7.14 0 1 0 0-14.28 7.14 7.14 0 0 0 0 14.28ZM49.085 17.583A14.416 14.416 0 0 0 34.669 32h28.832a14.415 14.415 0 0 0-14.416-14.416Z'
          fill='#183A9E'
        />
        <path
          d='M14.915 46.782a7.642 7.642 0 1 1 7.64-7.64 7.648 7.648 0 0 1-7.64 7.64Zm0-14.282a6.641 6.641 0 1 0 6.64 6.641 6.647 6.647 0 0 0-6.64-6.641Z'
          fill='#204ECF'
        />
        <path
          d='M29.83 60.7h-1a13.917 13.917 0 0 0-23.758-9.847A13.916 13.916 0 0 0 1 60.7H0a14.915 14.915 0 1 1 29.83 0ZM14.915 18.082a7.642 7.642 0 1 1 7.64-7.641 7.648 7.648 0 0 1-7.64 7.641Zm0-14.282a6.64 6.64 0 1 0 6.64 6.64 6.647 6.647 0 0 0-6.64-6.64Z'
          fill='#204ECF'
        />
        <path
          d='M29.83 32h-1a13.917 13.917 0 0 0-23.758-9.847A13.916 13.916 0 0 0 1 32H0a14.915 14.915 0 1 1 29.83 0ZM49.085 18.082a7.641 7.641 0 1 1 7.64-7.641 7.65 7.65 0 0 1-7.64 7.641Zm0-14.282a6.64 6.64 0 1 0 6.64 6.64 6.647 6.647 0 0 0-6.64-6.64Z'
          fill='#204ECF'
        />
        <path
          d='M64 32h-1a13.915 13.915 0 1 0-27.83 0h-1A14.915 14.915 0 1 1 64 32Z'
          fill='#204ECF'
        />
        <path
          d='M49.085 46.782a7.641 7.641 0 1 1 7.64-7.64 7.65 7.65 0 0 1-7.64 7.64Zm0-14.282a6.641 6.641 0 1 0 6.64 6.641 6.648 6.648 0 0 0-6.64-6.641Z'
          fill='#204ECF'
        />
        <path
          d='M64 60.7h-1a13.915 13.915 0 1 0-27.83 0h-1a14.915 14.915 0 1 1 29.83 0Z'
          fill='#204ECF'
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

SvgEmployeesBlue64.displayName = 'SvgEmployeesBlue64'
export default SvgEmployeesBlue64
