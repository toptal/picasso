import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgBrainCircuitsWhite64 = forwardRef(function SvgBrainCircuitsWhite64(
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
          d='M32 9.164a8.016 8.016 0 0 1 15.45-3.101 8.015 8.015 0 0 1 .547 3.739c.468-.066.941-.102 1.415-.105a10.838 10.838 0 0 1 10.762 10.912 11.01 11.01 0 0 1-.582 3.516 10.976 10.976 0 0 1-2.948 18.572 10.977 10.977 0 0 1 1.245 5.09 10.836 10.836 0 0 1-10.347 10.89A7.995 7.995 0 0 1 32 55.912V41.538h9v-18h-9V9.164Z'
          opacity={0.3}
        />
        <path
          fill='#231F20'
          d='M32 36.883a4.345 4.345 0 1 0 0-8.69 4.345 4.345 0 0 0 0 8.69Z'
          opacity={0.3}
        />
        <path
          fill='#fff'
          d='M23.985 64.538a8.538 8.538 0 0 1-7.88-5.379A11.305 11.305 0 0 1 5.61 47.786c.001-1.67.365-3.319 1.065-4.834A11.482 11.482 0 0 1 3.83 23.963a11.499 11.499 0 0 1-.505-3.354A11.35 11.35 0 0 1 14.59 9.197c.281 0 .57.014.884.042l-.001-.075A8.517 8.517 0 0 1 27.27 1.198a8.516 8.516 0 0 1 5.23 7.966h-1a7.516 7.516 0 1 0-15.028 0c0 .203.015.402.03.602l.045.613-.61-.081a9.996 9.996 0 0 0-1.348-.1 10.35 10.35 0 0 0-10.263 10.41c.002 1.143.19 2.276.556 3.358l.11.323-.263.22A10.476 10.476 0 0 0 7.54 42.232l.517.204-.257.493a10.428 10.428 0 0 0 8.677 15.249l.337.013.114.318A7.495 7.495 0 0 0 31.5 55.912h1a8.58 8.58 0 0 1-8.515 8.626Z'
        />
        <path
          fill='#fff'
          d='M40.015 64.538a8.58 8.58 0 0 1-8.515-8.626V41.538h1v14.374a7.496 7.496 0 0 0 14.572 2.597l.113-.318.338-.013a10.427 10.427 0 0 0 8.677-15.25l-.257-.492.517-.204a10.476 10.476 0 0 0 2.81-17.723l-.261-.22.11-.323c.365-1.082.553-2.215.555-3.357A10.35 10.35 0 0 0 49.41 10.197a9.995 9.995 0 0 0-1.348.1l-.61.082.045-.613c.015-.2.03-.399.03-.602a7.516 7.516 0 1 0-15.028 0h-1a8.514 8.514 0 1 1 17.028 0v.075c.313-.028.602-.042.883-.042A11.35 11.35 0 0 1 60.674 20.61a11.496 11.496 0 0 1-.505 3.354 11.48 11.48 0 0 1-2.844 18.989 11.548 11.548 0 0 1 1.065 4.834A11.304 11.304 0 0 1 47.895 59.16a8.538 8.538 0 0 1-7.88 5.379Z'
        />
        <path fill='#fff' d='M32.5 14.937h-1v8.601h1v-8.6Z' />
        <path
          fill='#fff'
          d='M41.5 42.038h-19v-19h19v19Zm-18-1h17v-17h-17v17Z'
        />
        <path
          fill='#fff'
          d='M23 32.038h-8.6v1H23v-1ZM49.6 32.038H41v1h8.6v-1ZM49.6 23.038H41v1h8.6v-1ZM49.6 41.038H41v1h8.6v-1ZM23 41.038h-8.6v1H23v-1ZM23 23.038h-8.6v1H23v-1Z'
        />
        <path
          fill='#fff'
          d='M23.5 14.937h-1v8.601h1v-8.6ZM41.5 14.937h-1v8.601h1v-8.6ZM23.5 41.538h-1v8.6h1v-8.6ZM41.5 41.538h-1v8.6h1v-8.6Z'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 .538h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgBrainCircuitsWhite64.displayName = 'SvgBrainCircuitsWhite64'
export default SvgBrainCircuitsWhite64
