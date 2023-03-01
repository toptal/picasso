import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgManufacturingBlue64 = forwardRef(function SvgManufacturingBlue64(
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
          d='M54.766 43.059H29.078v6.813h25.688V43.06ZM26.071 23.287h-8.938l1.055-4.579h6.827l1.056 4.579ZM39.739 23.287h-8.938l1.056-4.579h6.826l1.056 4.579ZM54.766 7.314H43.858v6.814h10.908V7.314ZM59.796 63.5H4.204V49.872h9.931v6.814h45.661V63.5Z'
          fill='#183A9E'
        />
        <path d='M63.5 63H.5v1h63v-1Z' fill='#204ECF' />
        <path
          d='M60.296 63.5h-1V50.373H29.578V63.5h-1V49.373h31.718V63.5Z'
          fill='#204ECF'
        />
        <path
          d='M55.266 50.373H43.358V0h11.908v50.373Zm-10.908-1h9.908V1h-9.908v48.373Z'
          fill='#204ECF'
        />
        <path d='M14.635 63.5h-1V22.787h30.223v1H14.635V63.5Z' fill='#204ECF' />
        <path
          d='M4.704 63.5h-1V42.56h10.431v1H4.704V63.5ZM26.7 23.787H16.503l2.342-10.16h5.511l2.342 10.16Zm-8.939-1h7.681l-1.88-8.16h-3.92l-1.88 8.16ZM40.368 23.787H30.172l2.343-10.16h5.51l2.343 10.16Zm-8.939-1h7.682l-1.881-8.16h-3.92l-1.88 8.16Z'
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

SvgManufacturingBlue64.displayName = 'SvgManufacturingBlue64'
export default SvgManufacturingBlue64
