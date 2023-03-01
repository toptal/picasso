import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgVideoPitch2Blue64 = forwardRef(function SvgVideoPitch2Blue64(
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
          d='M32 31.5c5.799 0 10.5-4.701 10.5-10.5S37.799 10.5 32 10.5 21.5 15.201 21.5 21 26.201 31.5 32 31.5ZM32 35.5c-8.85 0-16.46 5.35-19.75 13L19 49h3.5v-.5h4l2.72-2.38 1.04-3.93c.11-.4.47-.69.89-.69h.21c1.18 0 2.14.96 2.14 2.15v4.85h6.26c.54 0 1.04.19 1.44.5H45l6.75-.5c-3.29-7.65-10.9-13-19.75-13Z'
          fill='#183A9E'
          opacity={0.15}
        />
        <path
          d='M32 32c-6.07 0-11-4.93-11-11s4.93-11 11-11 11 4.93 11 11-4.93 11-11 11Zm0-21c-5.51 0-10 4.49-10 10s4.49 10 10 10 10-4.49 10-10-4.49-10-10-10ZM51.3 48.7A21.002 21.002 0 0 0 32 36c-8.4 0-15.97 4.98-19.3 12.7l-.92-.4A21.993 21.993 0 0 1 31.99 35c8.79 0 16.73 5.22 20.21 13.3l-.92.4h.02Z'
          fill='#024FD6'
        />
        <path
          d='M61.5 49H45v-1h16.5c.83 0 1.5-.67 1.5-1.5v-39c0-.83-.67-1.5-1.5-1.5h-59C1.67 6 1 6.67 1 7.5v39c0 .83.67 1.5 1.5 1.5H19v1H2.5A2.5 2.5 0 0 1 0 46.5v-39A2.5 2.5 0 0 1 2.5 5h59A2.5 2.5 0 0 1 64 7.5v39a2.5 2.5 0 0 1-2.5 2.5Z'
          fill='#024FD6'
        />
        <path d='m36.65 21-7.15 4.56v-9.12L36.65 21Z' fill='#024FD6' />
        <path
          d='m37.62 62-6.91-.04c-.15-.06-3.65-1.52-5.03-2.96H22V48h4.31l2.47-2.16 1-3.78c.16-.62.73-1.06 1.37-1.06h.21c1.46 0 2.64 1.19 2.64 2.65V48h5.76c1.42 0 2.64 1.07 2.79 2.43.08.77-.17 1.53-.67 2.09a2.705 2.705 0 0 1-.68 3.51c.06.23.09.47.09.71 0 .82-.36 1.58-.99 2.09.02.15.04.29.04.44 0 1.5-1.22 2.72-2.72 2.72V62ZM31 61h6.62c.95 0 1.72-.77 1.72-1.72 0-.17-.03-.34-.08-.51l-.11-.37.33-.2c.51-.32.81-.86.81-1.46 0-.24-.05-.48-.15-.7l-.19-.42.4-.22c.55-.3.89-.88.89-1.51 0-.41-.14-.8-.41-1.11l-.33-.39.4-.32c.46-.37.7-.94.64-1.53-.09-.86-.88-1.53-1.79-1.53h-6.76v-5.35c0-.91-.74-1.65-1.64-1.65h-.21c-.19 0-.35.13-.4.31l-1.08 4.08-2.98 2.61h-3.69v9h3.14l.15.18c.88 1.05 3.62 2.36 4.72 2.82V61Z'
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

SvgVideoPitch2Blue64.displayName = 'SvgVideoPitch2Blue64'
export default SvgVideoPitch2Blue64
