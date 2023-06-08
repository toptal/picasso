import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgPlanetWhite64 = forwardRef(function SvgPlanetWhite64(
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
          d='m53.079 8.596-1.782 4.018 3.244 7.315h-22.54V63.5A31.497 31.497 0 0 0 53.078 8.596ZM48.706 5.3A31.341 31.341 0 0 0 32 .5v4.8h16.706Z'
          opacity={0.3}
        />
        <path
          fill='#fff'
          d='M21.825 55.572h-1.838l-3.215-3.215-.004-9.782h-1.143l-3.188-3.188V35.5l-2.018-2.018H8.375l-7.569-7.57.707-.707 7.276 7.277h2.045l2.603 2.604v3.887l2.602 2.602h1.728l.005 10.368 2.629 2.629h.424V52.97l5.177-5.173v-1.974l2.704-2.705v-4.271h-2.702l-5.873-5.872h-5.162l.001-2.921 4.263-4.241h2.966l2.325-2.318v-3.797l-3.227-3.227h-2.568l-2.355 2.355-3.875-3.876 2.475-2.479V5.187h1v7.698l-2.061 2.065 2.461 2.462 1.941-1.941h3.396l3.813 3.813v4.626l-2.912 2.903h-2.966L15.97 30.47l-.001 1.505h4.576l5.874 5.872h3.287v5.685l-2.704 2.705v1.974l-5.177 5.173v2.188ZM48.631 49.824h-1.922l-5.176-5.176v-5.964h-6.167L31.5 34.821v-5.553h1v5.139l3.28 3.277h6.753v6.549l4.59 4.591h.508v-5.72l2.373-2.373V34.57l-7.292-7.311h-6.571v-1h6.987l7.876 7.898v6.988l-2.373 2.373v6.306ZM56.204 24.919h-5.017l-4.64-4.637.707-.707 4.347 4.344h4.189l1.468-1.466h4.924v1h-4.51l-1.468 1.466Z'
        />
        <path
          fill='#fff'
          d='M32 64A32 32 0 1 1 48.667 4.678l.312.202-.544.839-.3-.195A31.044 31.044 0 1 0 53 9.196l.678-.735A32 32 0 0 1 32 64Z'
        />
        <path fill='#fff' d='M32.5 19.929h-1V32h1V19.929Z' />
        <path
          fill='#fff'
          d='M55.596 20.428H31.5V4.799h24.096l-3.744 7.814 3.744 7.815Zm-23.096-1h21.508l-3.266-6.815L54.008 5.8H32.5v13.629Z'
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

SvgPlanetWhite64.displayName = 'SvgPlanetWhite64'
export default SvgPlanetWhite64
