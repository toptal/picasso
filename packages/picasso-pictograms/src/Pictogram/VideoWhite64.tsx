import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgVideoWhite64 = forwardRef(function SvgVideoWhite64(
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
      <path
        fill='#231F20'
        d='M33.528 39.186a13.508 13.508 0 0 1-22.911 0H.5v14.386h43.145V39.186H33.528ZM63.5 39.711v13.336L49.156 42.813v-7.251L63.5 39.711ZM27.931 32l-4.397 2.539-4.397 2.538V26.923l4.397 2.538L27.931 32Z'
        opacity={0.3}
      />
      <path
        fill='#fff'
        d='M44.145 54.072H0V9.928h44.145v44.144ZM1 53.072h42.145V10.928H1v42.144ZM64 54.019l-15.344-10.95V20.93L64 9.981V54.02ZM49.656 42.555 63 52.076V11.924l-13.344 9.52v21.111Z'
      />
      <path
        fill='#fff'
        d='M22.072 46.036A14.035 14.035 0 1 1 36.108 32a14.052 14.052 0 0 1-14.036 14.036Zm0-27.072A13.035 13.035 0 1 0 35.108 32a13.05 13.05 0 0 0-13.036-13.036Z'
      />
      <path
        fill='#fff'
        d='M18.637 37.944V26.056L28.93 32l-10.294 5.944Zm1-10.155v8.422L26.93 32l-7.294-4.211Z'
      />
    </svg>
  )
})

SvgVideoWhite64.displayName = 'SvgVideoWhite64'
export default SvgVideoWhite64
