import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgAccessDeniedBlue64 = forwardRef(function SvgAccessDeniedBlue64(
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
          d='M26.375.5v11.436a20.718 20.718 0 0 1 0 40.128v5.248h23.063V6.688L63.333.594 26.375.5Z'
          fill='#183A9E'
        />
        <path
          d='M64 57.313h-1V1H26.875v10.936h-1V0H64v57.313ZM49.438 57.813H25.875v-5.749h1v4.749h22.563v1Z'
          fill='#204ECF'
        />
        <path
          d='M48.938 64.266V6.361L63.132.136a.594.594 0 0 1 .565.027.616.616 0 0 1 .303.529v56.947l-15.062 6.627Zm1-57.252v55.72L63 56.986V1.283L49.938 7.014Zm13.64-5.984-.07.03a.436.436 0 0 0 .07-.03ZM21.212 53.212A21.213 21.213 0 1 1 42.425 32a21.236 21.236 0 0 1-21.212 21.212Zm0-41.424A20.212 20.212 0 1 0 41.425 32a20.236 20.236 0 0 0-20.212-20.212Z'
          fill='#204ECF'
        />
        <path
          d='M26.722 25.784 14.997 37.51l.707.707L27.429 26.49l-.707-.707Z'
          fill='#204ECF'
        />
        <path
          d='m15.704 25.784-.707.707 11.725 11.725.707-.707-11.725-11.725Z'
          fill='#204ECF'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64v64.266H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgAccessDeniedBlue64.displayName = 'SvgAccessDeniedBlue64'
export default SvgAccessDeniedBlue64
