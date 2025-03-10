import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgResearchWhite64 = forwardRef(function SvgResearchWhite64(
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
      viewBox='0 0 65 65'
      className={className}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <g clipPath='url(#a)'>
        <path
          fill='#231F20'
          d='m39.093 33.136 4.558.56a18.47 18.47 0 0 0 1.39-6.087l-4.356-1.476a14.015 14.015 0 0 0-1.19-5.22l3.283-3.218a18.461 18.461 0 0 0-3.893-4.882L35.012 15.3a14.033 14.033 0 0 0-4.819-2.319l-.47-4.58a18.471 18.471 0 0 0-6.244 0l-.47 4.584a14.033 14.033 0 0 0-4.812 2.32l-3.88-2.492a18.469 18.469 0 0 0-3.893 4.881l3.293 3.229a14.022 14.022 0 0 0-1.187 5.205l-4.369 1.48a18.467 18.467 0 0 0 1.39 6.088l4.57-.561a14.14 14.14 0 0 0 3.334 4.18l-1.564 4.332a18.465 18.465 0 0 0 5.625 2.709l2.407-3.916c1.769.344 3.588.344 5.357.002l2.405 3.913a18.46 18.46 0 0 0 5.625-2.708l-1.56-4.323a14.141 14.141 0 0 0 3.343-4.188Z'
          opacity={0.3}
        />
        <path
          fill='#fff'
          d='m21.743 44.94-.365-.104a18.916 18.916 0 0 1-5.777-2.782l-.31-.22 1.577-4.367a14.564 14.564 0 0 1-3.025-3.794l-4.61.565-.145-.35a18.936 18.936 0 0 1-1.426-6.252l-.02-.379 4.404-1.492c.09-1.625.454-3.222 1.076-4.725l-3.319-3.254.183-.333a18.931 18.931 0 0 1 3.998-5.013l.284-.253 3.911 2.512a14.458 14.458 0 0 1 4.366-2.105l.476-4.622.374-.064a18.904 18.904 0 0 1 6.413 0l.374.064.474 4.618a14.44 14.44 0 0 1 4.373 2.105l3.905-2.508.284.253a18.934 18.934 0 0 1 3.998 5.013l.183.333-3.31 3.245c.624 1.508.99 3.11 1.08 4.738l4.39 1.488-.02.38a18.93 18.93 0 0 1-1.425 6.25l-.146.351-4.597-.563a14.573 14.573 0 0 1-3.035 3.8l1.574 4.358-.31.22a18.915 18.915 0 0 1-5.777 2.783l-.365.104-2.425-3.946c-1.61.272-3.254.271-4.863-.002l-2.427 3.949Zm7.782-5.054 2.385 3.88a17.894 17.894 0 0 0 4.8-2.31l-1.548-4.288.264-.224a13.59 13.59 0 0 0 3.225-4.04l.16-.306 4.52.555a17.92 17.92 0 0 0 1.186-5.194l-4.32-1.464-.012-.346a13.491 13.491 0 0 0-1.148-5.033l-.14-.317 3.257-3.193a17.921 17.921 0 0 0-3.322-4.165l-3.842 2.467-.277-.207a13.479 13.479 0 0 0-4.647-2.237l-.335-.088-.466-4.542a17.905 17.905 0 0 0-5.327 0l-.468 4.546-.335.088a13.47 13.47 0 0 0-4.64 2.238l-.277.207-3.849-2.472a17.914 17.914 0 0 0-3.32 4.165l3.265 3.202-.14.317a13.475 13.475 0 0 0-1.143 5.02l-.012.346-4.334 1.468c.134 1.781.534 3.531 1.185 5.194l4.534-.556.16.306a13.562 13.562 0 0 0 3.215 4.033l.263.224-1.55 4.296a17.898 17.898 0 0 0 4.8 2.31l2.386-3.883.34.066a13.61 13.61 0 0 0 5.168.002l.339-.065Z'
        />
        <path
          fill='#fff'
          d='M26.6 53.201a26.6 26.6 0 1 1 26.601-26.6 26.63 26.63 0 0 1-26.6 26.6ZM26.6 1a25.6 25.6 0 1 0 25.601 25.6A25.63 25.63 0 0 0 26.601 1Z'
        />
        <path
          fill='#fff'
          d='M58.748 64.207 42.174 47.633l.707-.707 15.867 15.867 4.045-4.045-15.867-15.867.707-.707 16.574 16.574-5.459 5.46Z'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64.207v64.207H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgResearchWhite64.displayName = 'SvgResearchWhite64'
export default SvgResearchWhite64
