import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgPlanHelpWhite64 = forwardRef(function SvgPlanHelpWhite64(
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
      <g fill='#000' opacity={0.3}>
        <path d='M16 41V23h-3v22h17v-4H16ZM47 12v29H32v4h18V12h-3ZM31.5 26C37.299 26 42 21.299 42 15.5S37.299 5 31.5 5 21 9.701 21 15.5 25.701 26 31.5 26Z' />
      </g>
      <path
        fill='#fff'
        fillRule='evenodd'
        d='M47 41H33v10h29V41H47Zm15-1V13H50v-1h13v40H32V41h-1v22H0l.1-40H13v1H1v27h29V41H16V1h31v39h15Zm-16 0V30H17v10h29Zm0-11H17V2h29v27ZM1 52h29v10H1V52Zm20 5H10v1h11v-1Zm5-22h11v1H26v-1Zm27 11H42v1h11v-1ZM26.6 16.4l3.4 3.3 7.1-7.1-.7-.7-6.4 6.4-2.6-2.7-.8.8Z'
        clipRule='evenodd'
      />
    </svg>
  )
})

SvgPlanHelpWhite64.displayName = 'SvgPlanHelpWhite64'
export default SvgPlanHelpWhite64
