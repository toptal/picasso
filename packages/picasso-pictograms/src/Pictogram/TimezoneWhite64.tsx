import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgTimezoneWhite64 = forwardRef(function SvgTimezoneWhite64(
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
          d='m57.713 31.381-1.469 1.467h-6.808L37.775 21.187H17.699l6.733 6.732v4.211l-2.618 2.612-2.967-.001-2.172 2.161v4h3.071l5.873 5.873h2.995v4.978l-2.705 2.706v1.974l-5.176 5.173V63.5h42.325V31.381h-5.345Zm-5.33 20.59-5.5 5.5-4.602-4.602v-6.257h-6.46l-3.573-3.57v-5.345l2.48-2.479 8.44-.03 9.217 9.236-.003 7.547ZM16.675 50.503H15.24l-2.896-2.895v-3.887l-2.31-2.31-2.044-.001-7.486-7.487V63.5h19.098l-2.922-2.922-.005-10.075Z'
          fill='#231F20'
        />
        <path
          d='M16.675 17.688a8.843 8.843 0 1 1 8.784-8.844 8.824 8.824 0 0 1-8.784 8.844Zm0-16.688a7.844 7.844 0 1 0 7.784 7.844A7.823 7.823 0 0 0 16.675 1ZM17.175 21.186h-1v30.44h1v-30.44ZM47.382 21.186h-1V63.5h1V21.186Z'
          fill='#fff'
        />
        <path
          d='M20.359 9.344h-4.184V3.282h1v5.062h3.184v1ZM46.882 17.688a8.844 8.844 0 1 1 8.785-8.844 8.825 8.825 0 0 1-8.785 8.844Zm0-16.688a7.844 7.844 0 1 0 7.785 7.844A7.824 7.824 0 0 0 46.882 1Z'
          fill='#fff'
        />
        <path
          d='m49.133 11.82-2.751-2.77V3.282h1v5.356l2.461 2.478-.71.704ZM21.232 64h-1.837l-3.215-3.215-.005-9.782h-1.142l-3.188-3.188v-3.887L9.827 41.91H7.783L.15 34.276l.707-.707 7.34 7.341h2.044l2.604 2.604v3.887l2.602 2.602h1.727l.006 10.368L19.809 63h.423v-1.602l5.177-5.173v-1.973l2.705-2.706v-4.272h-2.702l-5.873-5.872h-3.364v-4.708l2.466-2.454 2.966.001 2.325-2.319v-3.796l-6.587-6.586.707-.707 6.88 6.879v4.625l-2.912 2.904-2.966-.001-1.879 1.87v3.292h2.778l5.873 5.872h3.288v5.686l-2.705 2.706v1.973l-5.177 5.174V64Z'
          fill='#fff'
        />
        <path
          d='M63.558 64H.004V20.686h63.554V64ZM1.004 63h61.554V21.686H1.004V63Z'
          fill='#fff'
        />
        <path
          d='M56.451 33.348h-7.222L37.421 21.54l.707-.707 11.515 11.515h6.394l1.469-1.467h4.923v1H57.92l-1.469 1.467ZM46.882 58.178l-5.1-5.103v-5.963h-6.168l-3.866-3.864V37.49l2.804-2.802h8.824l9.509 9.53-.003 7.961-6 6Zm-4.1-5.517 4.1 4.103 5-5 .003-7.134-8.924-8.943h-7.995l-2.218 2.216v4.931l3.28 3.278h6.753v6.55Z'
          fill='#fff'
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

SvgTimezoneWhite64.displayName = 'SvgTimezoneWhite64'
export default SvgTimezoneWhite64
