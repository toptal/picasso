import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { getColorClass } from './styles'

const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
  classes?: {
    root?: string
  }
}
const SvgAvailabilityPartTime24 = forwardRef(function SvgAvailabilityPartTime24(
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
      viewBox='0 0 24 24'
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
        d='M10.78 1.023c-.531.053-.969.114-1.32.182-4.031.789-7.311 3.974-8.194 7.955-.202.909-.244 1.314-.244 2.34 0 1.026.042 1.431.244 2.34.709 3.198 3.046 6.008 6.07 7.298 1.281.546 2.463.804 3.894.85l.77.024v-1l-.75-.024c-1.694-.055-3.169-.477-4.564-1.303a9.536 9.536 0 0 1-4.479-6.245c-.142-.673-.184-1.123-.184-1.94 0-1.617.307-2.903 1.035-4.333a9.479 9.479 0 0 1 6.502-4.96c.673-.142 1.123-.184 1.94-.184 1.617 0 2.903.307 4.333 1.035a9.487 9.487 0 0 1 4.93 6.362c.134.591.197 1.119.224 1.87l.025.71h1l-.024-.77c-.036-1.113-.195-2.048-.51-2.994a10.46 10.46 0 0 0-5.177-6.061c-1.095-.566-2.12-.891-3.401-1.078-.389-.057-1.797-.106-2.12-.074M11 7.5V11H6v1h6V4h-1v3.5m1.946 6.841c-.304.077-.736.305-.948.501l-.168.155.161.191c.088.106.198.227.245.269.085.076.086.076.195-.025.434-.405 1.148-.554 1.594-.332.258.129.375.324.375.628 0 .525-.45 1.041-1.87 2.142l-.65.504V19h3.4v-.719l-1.025-.01-1.024-.011.334-.258c.488-.377 1.134-1.019 1.35-1.343.256-.382.34-.662.316-1.053-.033-.542-.29-.902-.829-1.16-.281-.134-.323-.143-.76-.153-.309-.007-.54.009-.696.048m4.409-.008c-.577.162-1.051.728-1.264 1.507-.101.371-.098 1.317.006 1.68.305 1.068.976 1.613 1.908 1.549 1.035-.071 1.721-1.023 1.719-2.383-.002-.872-.225-1.505-.687-1.946-.346-.33-.602-.434-1.097-.448-.24-.007-.474.01-.585.041m3.152.014c-.015.014-.027 1.067-.027 2.34V19h.76v-2.392l.141-.123c.219-.193.377-.257.679-.274.336-.019.515.056.639.269.076.131.082.219.094 1.33l.013 1.19h.714v-1.313c0-1.528-.014-1.619-.293-1.877-.237-.217-.396-.262-.861-.243-.419.018-.65.103-.972.358l-.154.122V14.32h-.353c-.195 0-.366.012-.38.027m-2.148.792c.21.146.38.438.46.789.072.317.081 1.131.016 1.44-.138.657-.551 1.039-1.062.981-.564-.063-.878-.571-.922-1.489-.045-.941.181-1.563.649-1.786.247-.118.638-.088.859.065'
      />
    </svg>
  )
})

SvgAvailabilityPartTime24.displayName = 'SvgAvailabilityPartTime24'
export default SvgAvailabilityPartTime24
