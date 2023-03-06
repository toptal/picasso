import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgManufacturingWhite64 = forwardRef(function SvgManufacturingWhite64(
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
      viewBox='0 0 64 65'
      fill='none'
      className={className}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <g clipPath='url(#a)'>
        <path
          opacity={0.3}
          d='M54.766 43.2H29.078v6.814h25.688V43.2ZM26.071 23.429h-8.938l1.055-4.58h6.827l1.056 4.58ZM39.739 23.429h-8.938l1.056-4.58h6.826l1.056 4.58ZM54.766 7.456H43.858v6.813h10.908V7.456ZM59.796 63.642H4.204V50.014h9.931v6.814h45.661v6.814Z'
          fill='#231F20'
        />
        <path d='M63.5 63.142H.5v1h63v-1Z' fill='#fff' />
        <path
          d='M60.296 63.642h-1V50.515H29.578v13.127h-1V49.515h31.718v14.127Z'
          fill='#fff'
        />
        <path
          d='M55.266 50.514H43.358V.142h11.908v50.372Zm-10.908-1h9.908V1.142h-9.908v48.372Z'
          fill='#fff'
        />
        <path
          d='M14.635 63.642h-1V22.929h30.223v1H14.635v39.713Z'
          fill='#fff'
        />
        <path
          d='M4.704 63.642h-1V42.7h10.431v1H4.704v19.94ZM26.7 23.929H16.503l2.342-10.16h5.511l2.342 10.16Zm-8.939-1h7.681l-1.88-8.16h-3.92l-1.88 8.16ZM40.368 23.929H30.172l2.343-10.16h5.51l2.343 10.16Zm-8.939-1h7.682l-1.881-8.16h-3.92l-1.88 8.16Z'
          fill='#fff'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' transform='translate(0 .142)' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgManufacturingWhite64.displayName = 'SvgManufacturingWhite64'
export default SvgManufacturingWhite64
