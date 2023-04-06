import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgStopwatchBlue64 = forwardRef(function SvgStopwatchBlue64(
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
      viewBox='0 0 65 65'
      fill='none'
      className={className}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <g clipPath='url(#a)'>
        <path
          opacity={0.15}
          d='M50.566 31.958a5.453 5.453 0 0 1 0-10.906H47.21a5.45 5.45 0 0 1-3.9-9.261l-.001-.001a19.048 19.048 0 1 0-1.46 35.522h.005a5.452 5.452 0 0 1 5.356-4.448h3.355a5.454 5.454 0 0 1 0-10.906Zm-14.837.027a2.716 2.716 0 1 1-.001-5.432 2.716 2.716 0 0 1 0 5.432Z'
          fill='#183A9E'
        />
        <path
          d='M35.728 48.817a19.549 19.549 0 1 1 7.78-37.486l-.399.917a18.549 18.549 0 1 0-1.42 34.59l.321.948a19.508 19.508 0 0 1-6.282 1.031ZM21.333 9.196l-5.677 5.677.707.707 5.677-5.677-.707-.707Z'
          fill='#204ECF'
        />
        <path
          d='m19.201 12.034-.707.707 3.413 3.413.707-.707-3.413-3.413ZM35.728 32.485a3.216 3.216 0 1 1 0-6.432 3.216 3.216 0 0 1 0 6.432Zm0-5.431a2.216 2.216 0 1 0 0 4.432 2.216 2.216 0 0 0 0-4.432Z'
          fill='#204ECF'
        />
        <path
          d='M36.228 15.323h-1v11.23h1v-11.23ZM54.894 54.27H47.21a5.953 5.953 0 0 1 0-11.906h7.684a5.953 5.953 0 1 1 0 11.906ZM47.21 43.364a4.953 4.953 0 1 0 0 9.906h7.684a4.953 4.953 0 1 0 0-9.906H47.21Z'
          fill='#204ECF'
        />
        <path
          d='M58.25 43.364h-7.685a5.954 5.954 0 0 1 0-11.906h7.684a5.953 5.953 0 0 1 0 11.906Zm-7.685-10.906a4.953 4.953 0 0 0 0 9.906h7.684a4.953 4.953 0 0 0 0-9.906h-7.684Z'
          fill='#204ECF'
        />
        <path
          d='M58.25 32.458h-7.685a5.953 5.953 0 0 1 0-11.906h7.684a5.953 5.953 0 0 1 0 11.906Zm-7.685-10.906a4.953 4.953 0 0 0 0 9.906h7.684a4.953 4.953 0 0 0 0-9.906h-7.684Z'
          fill='#204ECF'
        />
        <path
          d='M54.894 21.552H47.21a5.953 5.953 0 0 1 0-11.906h7.684a5.953 5.953 0 0 1 0 11.906ZM47.21 10.646a4.953 4.953 0 1 0 0 9.906h7.684a4.953 4.953 0 0 0 0-9.906H47.21ZM19.069 64.214 0 44.62l6.955-6.956v-21.37a9.017 9.017 0 0 1 3.933-7.45L23.06.532a3.039 3.039 0 0 1 4.44 1.167 9.44 9.44 0 0 1-1.406 10.481l-4.33 4.882-.748-.664 4.33-4.881a8.44 8.44 0 0 0 1.263-9.363 2.038 2.038 0 0 0-2.985-.796L11.452 9.67a8.015 8.015 0 0 0-3.497 6.623V38.08l-6.55 6.55 17.674 18.16 9.519-9.52H47.21v1H29.012l-9.943 9.944ZM36.228 4.753h-1v5.469h1v-5.47Z'
          fill='#204ECF'
        />
        <path d='M39.67 4.253h-7.883v1h7.883v-1Z' fill='#204ECF' />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64.202v64.214H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgStopwatchBlue64.displayName = 'SvgStopwatchBlue64'
export default SvgStopwatchBlue64
