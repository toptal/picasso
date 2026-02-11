import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { getColorClass } from './styles'

const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
  classes?: {
    root?: string
  }
}
const SvgFailed16 = forwardRef(function SvgFailed16(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const {
    classes,
    className,
    style = {},
    color,
    scale,
    base,
    'data-testid': testId,
  } = props
  const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1)
  const svgStyle = {
    minWidth: `${scaledSize}px`,
    minHeight: `${scaledSize}px`,
    ...style,
  }

  return (
    <svg
      fill='none'
      viewBox='0 0 16 16'
      className={twMerge(
        'fill-current inline-block text-inherit h-[1em] align-[-.125em]',
        classes?.root,
        className,
        getColorClass(color)
      )}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path
        fillRule='evenodd'
        d='M6.6.591a1.46 1.46 0 0 0-.707.393c-.16.163-.381.537-2.97 5.027C1.102 9.169.107 10.919.074 11.024a1.451 1.451 0 0 0 1.032 1.842c.138.035.632.041 3.846.041H8.64v.494l1.819 1.052c1.001.578 1.838 1.052 1.861 1.052.023 0 .86-.474 1.861-1.052L16 13.4V9.153l-1.826-1.057a80.088 80.088 0 0 0-1.856-1.056c-.016 0-.151.071-.3.158a4.054 4.054 0 0 1-.304.167c-.019.005-.771-1.272-1.815-3.085C8.231 1.384 8.105 1.175 7.932.997 7.578.635 7.115.494 6.6.591m.539 1.035a.564.564 0 0 1 .151.153c.036.056.83 1.427 1.763 3.048.934 1.62 1.715 2.972 1.735 3.004.036.056.009.074-1.056.69l-1.092.631v2.769l-3.66-.007-3.66-.007-.094-.059a.441.441 0 0 1-.207-.417c.011-.125.268-.579 2.783-4.937 2.264-3.92 2.788-4.81 2.862-4.86a.511.511 0 0 1 .475-.008M6.4 6.453V8.64h1.013V4.267H6.4v2.186m7.031 2.368a34.48 34.48 0 0 1 1.049.619c0 .024-.519.307-.56.305-.073-.002-2.162-1.221-2.136-1.246.065-.065.527-.31.561-.298.021.008.51.287 1.086.62m-1.593.899c.587.337 1.068.619 1.068.627 0 .007-.132.088-.293.18l-.293.167-1.08-.62a33.589 33.589 0 0 1-1.079-.634c0-.02.569-.346.591-.339.01.003.498.282 1.086.619m-5.42-.289c-.01.01-.018.232-.018.493v.476h1.013v-.987h-.489c-.268 0-.496.008-.506.018m4.402 1.555.993.57v2.526l-.113-.066-1.073-.622-.96-.556-.007-1.262-.007-1.262.087.051 1.08.621m4.134 1.856c-.019.016-.478.286-1.021.599-.542.313-1.013.586-1.046.607l-.06.038v-2.53l1.073-.617 1.073-.617.007 1.245c.006.973 0 1.251-.026 1.275'
      />
    </svg>
  )
})

SvgFailed16.displayName = 'SvgFailed16'
export default SvgFailed16
