import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgBrainCircuitsBlue64 = forwardRef(function SvgBrainCircuitsBlue64(
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
          fill='#183A9E'
          d='M32 8.626a8.016 8.016 0 1 1 15.997.638c.468-.066.941-.101 1.415-.105a10.838 10.838 0 0 1 10.762 10.912 11.01 11.01 0 0 1-.582 3.516 10.977 10.977 0 0 1-2.948 18.572 10.977 10.977 0 0 1 1.245 5.09 10.836 10.836 0 0 1-10.347 10.89A7.995 7.995 0 0 1 32 55.374V41h9V23h-9V8.626Z'
          opacity={0.15}
        />
        <path
          fill='#183A9E'
          d='M32 36.345a4.345 4.345 0 1 0 0-8.69 4.345 4.345 0 0 0 0 8.69Z'
          opacity={0.15}
        />
        <path
          fill='#204ECF'
          d='M23.985 64a8.538 8.538 0 0 1-7.88-5.379A11.305 11.305 0 0 1 5.61 47.248c.001-1.67.365-3.319 1.065-4.834A11.482 11.482 0 0 1 3.83 23.424a11.498 11.498 0 0 1-.505-3.354A11.351 11.351 0 0 1 14.59 8.659c.281 0 .57.014.884.042l-.001-.075A8.517 8.517 0 0 1 27.27.66a8.515 8.515 0 0 1 5.23 7.966h-1a7.516 7.516 0 1 0-15.028 0c0 .203.015.402.03.602l.045.613-.61-.081a9.996 9.996 0 0 0-1.348-.1A10.35 10.35 0 0 0 4.326 20.07c.002 1.143.19 2.276.556 3.358l.11.323-.263.22A10.477 10.477 0 0 0 7.54 41.694l.517.204-.257.493a10.428 10.428 0 0 0 8.677 15.249l.337.013.114.318A7.495 7.495 0 0 0 31.5 55.374h1A8.58 8.58 0 0 1 23.985 64Z'
        />
        <path
          fill='#204ECF'
          d='M40.015 64a8.58 8.58 0 0 1-8.515-8.626V41h1v14.374a7.496 7.496 0 0 0 14.572 2.597l.113-.318.338-.013A10.429 10.429 0 0 0 56.2 42.39l-.257-.492.517-.204a10.476 10.476 0 0 0 2.81-17.723l-.261-.22.11-.323c.365-1.082.553-2.215.555-3.357A10.35 10.35 0 0 0 49.41 9.659a9.993 9.993 0 0 0-1.348.1l-.61.082.045-.613c.015-.2.03-.399.03-.602a7.516 7.516 0 1 0-15.028 0h-1a8.514 8.514 0 1 1 17.028 0v.075c.313-.028.602-.042.883-.042a11.35 11.35 0 0 1 11.263 11.412 11.495 11.495 0 0 1-.505 3.354 11.48 11.48 0 0 1-2.844 18.989 11.547 11.547 0 0 1 1.065 4.835A11.304 11.304 0 0 1 47.895 58.62 8.538 8.538 0 0 1 40.014 64Z'
        />
        <path fill='#204ECF' d='M32.5 14.4h-1V23h1v-8.6Z' />
        <path
          fill='#204ECF'
          d='M41.5 41.5h-19v-19h19v19Zm-18-1h17v-17h-17v17Z'
        />
        <path
          fill='#204ECF'
          d='M23 31.5h-8.6v1H23v-1ZM49.6 31.5H41v1h8.6v-1ZM49.6 22.5H41v1h8.6v-1ZM49.6 40.5H41v1h8.6v-1ZM23 40.5h-8.6v1H23v-1ZM23 22.5h-8.6v1H23v-1Z'
        />
        <path
          fill='#204ECF'
          d='M23.5 14.4h-1V23h1v-8.6ZM41.5 14.4h-1V23h1v-8.6ZM23.5 41h-1v8.6h1V41ZM41.5 41h-1v8.6h1V41Z'
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

SvgBrainCircuitsBlue64.displayName = 'SvgBrainCircuitsBlue64'
export default SvgBrainCircuitsBlue64
