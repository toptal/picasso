import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgUserBlue64 = forwardRef(function SvgUserBlue64(
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
          d='M32.297 15.118a4.192 4.192 0 1 0 0-8.384 4.192 4.192 0 0 0 0 8.384Z'
          fill='#183A9E'
        />
        <path
          opacity={0.15}
          d='M32.297 15.118a8.462 8.462 0 0 0-8.463 8.463H40.76a8.463 8.463 0 0 0-8.463-8.463Z'
          fill='#183A9E'
        />
        <path
          d='M32.297 15.618a4.691 4.691 0 1 1 0-9.383 4.691 4.691 0 0 1 0 9.383Zm0-8.383a3.692 3.692 0 1 0 0 7.384 3.692 3.692 0 0 0 0-7.384Z'
          fill='#204ECF'
        />
        <path
          d='M41.26 23.581h-1a7.962 7.962 0 1 0-15.926 0h-1a8.963 8.963 0 0 1 17.925 0Z'
          fill='#204ECF'
        />
        <path
          d='M32.297 31.414a15.707 15.707 0 1 1 15.707-15.707 15.724 15.724 0 0 1-15.707 15.707Zm0-30.414a14.707 14.707 0 1 0 14.707 14.707A14.724 14.724 0 0 0 32.297 1ZM54.271 44.042h-1v-6.064H10.729v6.064h-1v-7.064h44.542v7.064Z'
          fill='#204ECF'
        />
        <path
          d='M32.797 30.914h-1v6.564h1v-6.564ZM20.458 64H0V43.542h20.458V64ZM1 63h18.458V44.542H1V63ZM64 64H43.542V43.542H64V64Zm-19.458-1H63V44.542H44.542V63Z'
          fill='#204ECF'
        />
        <path
          d='M9.482 56.887 5.806 53.21l.707-.707 2.969 2.969 4.463-4.464.707.707-5.17 5.17ZM57.012 49.823l-7.19 7.19.708.706 7.19-7.19-.708-.706Z'
          fill='#204ECF'
        />
        <path
          d='m50.53 49.823-.707.707 7.19 7.19.706-.708-7.19-7.19Z'
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

SvgUserBlue64.displayName = 'SvgUserBlue64'
export default SvgUserBlue64
