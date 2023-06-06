import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgContentImageWhite64 = forwardRef(function SvgContentImageWhite64(
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
          fill='#231F20'
          d='M18.523 36.058v21.367h38.902V34.016h-5.873v2.042H18.523Zm28.466 20.28H20.942l13.023-13.023 7.994 7.993 4.008-4.008 9.04 9.039h-8.018Z'
          opacity={0.3}
        />
        <path
          fill='#fff'
          d='M56.214 56.838h-36.48l14.232-14.23 7.993 7.993 4.009-4.009 10.246 10.246Zm-34.066-1H53.8l-7.832-7.832-4.009 4.009-7.993-7.993-11.818 11.816Z'
        />
        <path
          fill='#fff'
          d='M64 64H11.948V36.058h1V63H63V28.442H51.552v-1H64V64Z'
        />
        <path
          fill='#fff'
          d='M52.052 36.558H0V0h52.052v36.558ZM1 35.558h50.052V1H1v34.558Z'
        />
        <path
          fill='#fff'
          d='M40.443 10.06H8.286v1h32.157v-1ZM40.443 17.78H8.286v1h32.157v-1ZM20.472 25.498H8.286v1h12.186v-1Z'
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

SvgContentImageWhite64.displayName = 'SvgContentImageWhite64'
export default SvgContentImageWhite64
