import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgDocumentBlue64 = forwardRef(function SvgDocumentBlue64(
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
      <path
        opacity={0.15}
        d='M39.195.5v11.536H50.73L39.195.5ZM50.73 58.069H.5V63.5h50.23v-5.431Z'
        fill='#183A9E'
      />
      <path
        d='M50.73 12.537H38.695V.5h1v11.037H50.73v1ZM23.528 11.537H9.478v1h14.05v-1ZM39.195 23.252H9.477v1h29.718v-1ZM39.195 29.826H9.477v1h29.718v-1ZM38.63 36.4H9.477v1H38.63v-1ZM34.78 42.974H9.477v1H34.78v-1ZM14.519 49.525H9.477v1h5.042v-1Z'
        fill='#204ECF'
      />
      <path
        d='M51.23 64H0V0h39.402L51.23 11.83v15.164h-1v-14.75L38.988 1H1v62h49.23V36.019h1V64Z'
        fill='#204ECF'
      />
      <path
        d='m32.724 49.514 1.786-7.005L57.7 19.316a3.778 3.778 0 0 1 5.219 0 3.695 3.695 0 0 1 0 5.22l-23.19 23.193-7.005 1.785Zm2.687-6.492-1.302 5.107 5.107-1.301 22.996-23a2.695 2.695 0 0 0 0-3.805 2.755 2.755 0 0 0-3.805 0L35.411 43.022Z'
        fill='#204ECF'
      />
    </svg>
  )
})

SvgDocumentBlue64.displayName = 'SvgDocumentBlue64'
export default SvgDocumentBlue64
