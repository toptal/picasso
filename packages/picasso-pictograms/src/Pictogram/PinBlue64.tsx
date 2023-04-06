import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgPinBlue64 = forwardRef(function SvgPinBlue64(
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
          d='m57.932 31.38-1.469 1.468h-4.602l-3.565-3.563a60.814 60.814 0 0 1-4.588 6.225l7.263 7.282v6.574l-2.373 2.373v6.013h-1.215L42.5 52.868v-6.256h-6.46l-3.573-3.57v-5.346l2.48-2.478c-4.1-4.96-9.518-12.955-9.525-20.575H15.94v6.463l-2.268 2.272 3.169 3.169 2.148-2.148h2.981s2.042 2.04 3.521 3.52v4.211l-2.619 2.611h-2.966l-3.97 3.949v2.212h4.869l5.873 5.873h2.994v4.978l-2.704 2.706v1.973l-5.177 5.173V63.5h41.486V31.38h-5.345ZM17.734 50.503h-1.435l-2.896-2.895v-3.887l-2.31-2.31-2.044-.002-8.326-8.325V63.5H20.66l-2.922-2.922-.005-10.075Z'
          fill='#183A9E'
        />
        <path
          d='M22.291 64h-1.837l-3.215-3.215-.005-9.782h-1.142l-3.189-3.188v-3.887l-2.017-2.018H8.842L.37 33.437l.707-.707 8.179 8.18H11.3l2.603 2.604V47.4l2.603 2.602h1.727l.006 10.368L20.868 63h.423v-1.602l5.177-5.173V54.25l2.705-2.705v-4.272h-2.702l-5.873-5.872h-5.163l.001-2.921L19.7 34.24h2.966l2.325-2.318v-3.796l-3.228-3.228h-2.567l-2.355 2.355-3.876-3.875 2.475-2.48v-6.27h1v6.685l-2.061 2.064 2.462 2.462 1.941-1.941h3.395l3.814 3.814v4.625l-2.912 2.904-2.967-.001-3.676 3.657-.001 1.505h4.577l5.873 5.872h3.288v5.686l-2.705 2.706v1.973l-5.177 5.174V64ZM49.098 58.251h-1.923L42 53.075v-5.963h-6.167l-3.866-3.863v-5.76l2.657-2.656.707.708-2.364 2.362v4.931l3.28 3.278H43v6.549l4.589 4.59h.509v-5.719l2.373-2.373v-6.161l-7.117-7.136.708-.706 7.409 7.429v6.988l-2.373 2.373v6.305ZM56.67 33.348h-5.016l-3.712-3.71.707-.707 3.419 3.417h4.188l1.469-1.467h5.552v1h-5.138l-1.469 1.467Z'
          fill='#204ECF'
        />
        <path
          d='M63.777 64H.223V14.143h25.199v1H1.223V63h61.554V15.143h-9.3v-1h10.3V64Z'
          fill='#204ECF'
        />
        <path
          d='M39.45 20.183a5.555 5.555 0 1 1 5.518-5.555 5.543 5.543 0 0 1-5.519 5.555Zm0-10.11a4.555 4.555 0 1 0 4.518 4.555 4.542 4.542 0 0 0-4.519-4.555Z'
          fill='#204ECF'
        />
        <path
          d='m39.45 40.82-.344-.324c-.58-.546-14.184-13.533-14.184-25.868A14.526 14.526 0 0 1 49.757 4.29a14.53 14.53 0 0 1 4.22 10.337c0 12.335-13.605 25.322-14.185 25.868l-.343.324Zm0-39.82a13.593 13.593 0 0 0-13.528 13.628c0 10.839 11.387 22.677 13.527 24.806 2.14-2.129 13.528-13.967 13.528-24.806A13.593 13.593 0 0 0 39.449 1Z'
          fill='#204ECF'
        />
        <path d='M44.468 14.128H34.43v1h10.038v-1Z' fill='#204ECF' />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgPinBlue64.displayName = 'SvgPinBlue64'
export default SvgPinBlue64
