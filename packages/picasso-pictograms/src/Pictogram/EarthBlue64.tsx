import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgEarthBlue64 = forwardRef(function SvgEarthBlue64(
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
      <path fill='#183A9E' d='M32 .5v63a31.5 31.5 0 1 0 0-63Z' opacity={0.15} />
      <path
        fill='#204ECF'
        d='M21.825 55.572h-1.838l-3.215-3.215-.004-9.782h-1.143l-3.188-3.188V35.5l-2.017-2.018-2.045-.001-7.569-7.569.707-.707 7.276 7.276 2.045.001 2.603 2.603v3.888l2.602 2.602h1.728l.005 10.368 2.629 2.629h.424V52.97l5.177-5.173v-1.974l2.704-2.705v-4.271h-2.702l-5.873-5.872h-5.162l.001-2.921 4.263-4.241h2.966l2.326-2.318v-3.797l-3.228-3.227h-2.568l-2.355 2.355-3.875-3.876 2.475-2.479V5.187h1v7.698l-2.061 2.065 2.461 2.462 1.941-1.941h3.396l3.814 3.813v4.626l-2.913 2.903h-2.966L15.97 30.47l-.001 1.505h4.577l5.873 5.872h3.287v5.685l-2.704 2.705v1.974l-5.177 5.173v2.188ZM48.632 49.824h-1.923l-5.176-5.176v-5.964h-6.167L31.5 34.82v-5.76l2.804-2.802h8.824l7.877 7.898v6.988l-2.373 2.373v6.306Zm-1.509-1h.509v-5.72l2.373-2.373V34.57l-7.293-7.311h-7.994L32.5 29.475v4.932l3.28 3.277h6.753v6.55l4.59 4.59ZM56.204 24.919h-5.017l-4.099-4.096h-2.01l-2.664-2.481h-7.112v-7.405l8.251-8.42.714.7-7.965 8.128v5.997h6.506l2.663 2.48h2.032l4.098 4.097h4.189l1.468-1.466h4.924v1h-4.51l-1.468 1.466Z'
      />
      <path
        fill='#204ECF'
        d='M32 64a32 32 0 1 1 32-32 32.036 32.036 0 0 1-32 32Zm0-63a31 31 0 1 0 31 31A31.036 31.036 0 0 0 32 1Z'
      />
    </svg>
  )
})

SvgEarthBlue64.displayName = 'SvgEarthBlue64'
export default SvgEarthBlue64
