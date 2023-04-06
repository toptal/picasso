import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgBrainIntelligenceBlue64 = forwardRef(
  function SvgBrainIntelligenceBlue64(props: Props, ref: Ref<SVGSVGElement>) {
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
            d='M32 8.626a8.016 8.016 0 1 1 15.997.638c.468-.066.941-.101 1.415-.105a10.838 10.838 0 0 1 10.762 10.912 11.01 11.01 0 0 1-.582 3.516 10.977 10.977 0 0 1-2.948 18.572 10.977 10.977 0 0 1 1.245 5.09 10.836 10.836 0 0 1-10.347 10.89A7.995 7.995 0 0 1 32 55.374V8.626Z'
            fill='#183A9E'
          />
          <path
            d='M23.985 64a8.538 8.538 0 0 1-7.88-5.379A11.305 11.305 0 0 1 5.61 47.248c.001-1.67.365-3.319 1.065-4.834A11.482 11.482 0 0 1 3.83 23.424a11.498 11.498 0 0 1-.505-3.354A11.351 11.351 0 0 1 14.59 8.659c.281 0 .57.014.884.042l-.001-.075A8.517 8.517 0 0 1 27.27.66a8.515 8.515 0 0 1 5.23 7.966v46.748A8.58 8.58 0 0 1 23.985 64ZM14.59 9.66A10.35 10.35 0 0 0 4.326 20.07c.002 1.143.19 2.276.556 3.358l.11.323-.263.22A10.477 10.477 0 0 0 7.54 41.694l.517.204-.257.493a10.428 10.428 0 0 0 8.677 15.249l.337.013.114.318A7.495 7.495 0 0 0 31.5 55.374V8.626a7.516 7.516 0 1 0-15.028 0c0 .203.015.402.03.602l.045.613-.61-.081a9.996 9.996 0 0 0-1.348-.1Z'
            fill='#204ECF'
          />
          <path
            d='m24.344 27.479-.344-.94A11.544 11.544 0 0 0 31.5 15.7h1a12.549 12.549 0 0 1-8.156 11.779ZM7.795 42.388l-.887-.462a11.297 11.297 0 0 1 6.13-5.41l.344.938a10.303 10.303 0 0 0-5.587 4.934Z'
            fill='#204ECF'
          />
          <path
            d='M40.015 64a8.58 8.58 0 0 1-8.515-8.626V8.626a8.514 8.514 0 1 1 17.028 0v.075c.313-.028.602-.042.883-.042a11.35 11.35 0 0 1 11.263 11.412 11.495 11.495 0 0 1-.505 3.354 11.48 11.48 0 0 1-2.844 18.989 11.547 11.547 0 0 1 1.065 4.835A11.304 11.304 0 0 1 47.895 58.62 8.538 8.538 0 0 1 40.014 64Zm0-63A7.58 7.58 0 0 0 32.5 8.626v46.748a7.496 7.496 0 0 0 14.572 2.597l.113-.318.338-.013A10.429 10.429 0 0 0 56.2 42.39l-.257-.492.517-.204a10.476 10.476 0 0 0 2.81-17.723l-.261-.22.11-.323c.365-1.082.553-2.215.555-3.357A10.35 10.35 0 0 0 49.41 9.659a9.993 9.993 0 0 0-1.348.1l-.61.082.045-.613c.015-.2.03-.399.03-.602A7.579 7.579 0 0 0 40.015 1Z'
            fill='#204ECF'
          />
          <path
            d='M39.656 27.479A12.549 12.549 0 0 1 31.5 15.7h1A11.544 11.544 0 0 0 40 26.54l-.344.939ZM56.205 42.388a10.303 10.303 0 0 0-5.587-4.934l.344-.938a11.297 11.297 0 0 1 6.13 5.41l-.887.462Z'
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
  }
)

SvgBrainIntelligenceBlue64.displayName = 'SvgBrainIntelligenceBlue64'
export default SvgBrainIntelligenceBlue64
