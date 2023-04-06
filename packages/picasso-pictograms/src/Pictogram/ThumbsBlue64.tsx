import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgThumbsBlue64 = forwardRef(function SvgThumbsBlue64(
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
          d='M49.398 57.701H29.772a15.682 15.682 0 0 1-10.424-3.966l-.292-.26a16.994 16.994 0 0 1-5.698-12.696H.5v14.777h11.998a19.935 19.935 0 0 0 15.94 7.945H48.86c1.27 0 2.524-.29 3.665-.846a5.879 5.879 0 0 0 2.837-7.576l-.429-1.014a6.032 6.032 0 0 1-5.535 3.636Z'
          fill='#183A9E'
        />
        <path
          d='M48.86 64H28.438a20.52 20.52 0 0 1-16.188-7.944H0V25.789h11.313l11.026-11.075 6.123-12.572a3.807 3.807 0 0 1 5.164-1.72 8.985 8.985 0 0 1 4.767 9.552l-2.098 12.203h20.231a7.43 7.43 0 0 1 7.467 6.909 7.175 7.175 0 0 1-2.817 6.046c.392.532.734 1.1 1.023 1.694a6.372 6.372 0 0 1-2.958 8.49l-.042.02.17.39a6.376 6.376 0 0 1-3.373 8.434l-.407.171.233.552a6.375 6.375 0 0 1-3.078 8.221 8.907 8.907 0 0 1-3.884.897ZM1 55.057h11.748l.15.2A19.507 19.507 0 0 0 28.438 63H48.86a7.911 7.911 0 0 0 3.447-.795 5.377 5.377 0 0 0 2.595-6.932l-.626-1.476 1.333-.56a5.38 5.38 0 0 0 2.844-7.111l-.555-1.27.906-.44a5.37 5.37 0 0 0 2.495-7.155 9.793 9.793 0 0 0-.969-1.592l-.579-.775.442-.292a6.184 6.184 0 0 0 2.8-5.474 6.42 6.42 0 0 0-6.467-5.952H35.107l2.3-13.372a7.987 7.987 0 0 0-4.238-8.493A2.809 2.809 0 0 0 29.36 2.58l-6.253 12.78-11.378 11.43H1v28.266Z'
          fill='#204ECF'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64v64.001H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgThumbsBlue64.displayName = 'SvgThumbsBlue64'
export default SvgThumbsBlue64
