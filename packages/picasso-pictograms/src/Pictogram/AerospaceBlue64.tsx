import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgAerospaceBlue64 = forwardRef(function SvgAerospaceBlue64(
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
          d='M37.225 57.944h-10.45l-2.05 5.556h14.55l-2.05-5.556ZM15.405 40.838v17.106h7.482v-35.64a27.04 27.04 0 0 1-7.482 18.534ZM48.595 40.838v17.106h-7.481v-35.64a27.04 27.04 0 0 0 7.48 18.534Z'
          fill='#183A9E'
        />
        <path
          d='M40.512 64H23.488l2.19-5.431H5.431v-.5a20.014 20.014 0 0 1 7.215-15.298 26.83 26.83 0 0 0 9.74-20.467v-4.15A31.13 31.13 0 0 1 26.17 3.359a6.74 6.74 0 0 1 11.66 0 31.13 31.13 0 0 1 3.784 14.795v4.15a26.829 26.829 0 0 0 9.74 20.467A20.013 20.013 0 0 1 58.57 58.07v.5H38.322l2.19 5.43ZM24.97 63h14.06l-2.19-5.431h20.722a19.036 19.036 0 0 0-6.852-14.033 27.827 27.827 0 0 1-10.096-21.232v-4.15a30.127 30.127 0 0 0-3.662-14.318 5.742 5.742 0 0 0-9.903 0 30.127 30.127 0 0 0-3.663 14.318v4.15A27.826 27.826 0 0 1 13.29 43.536 19.034 19.034 0 0 0 6.438 57.57H27.16l-2.19 5.43Z'
          fill='#204ECF'
        />
        <path d='M37.225 57.569h-10.45v1h10.45v-1Z' fill='#204ECF' />
        <path
          d='M32.5 44.056h-1v14.013h1V44.056ZM23.386 22.304h-1v21.752h1V22.304ZM41.614 22.304h-1v21.752h1V22.304ZM35.922 10.433h-1a2.923 2.923 0 1 0-5.844 0h-1a3.924 3.924 0 0 1 6.698-2.778 3.922 3.922 0 0 1 1.146 2.778Z'
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

SvgAerospaceBlue64.displayName = 'SvgAerospaceBlue64'
export default SvgAerospaceBlue64
