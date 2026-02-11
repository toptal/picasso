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
const SvgChef24 = forwardRef(function SvgChef24(
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
        d='M12.78 1.025c-1.055.114-2.144.577-2.931 1.244-.137.116-.236.172-.28.158a23.914 23.914 0 0 1-.415-.143c-.574-.199-.976-.261-1.714-.262-.479 0-.753.019-1 .071-2.004.418-3.503 1.736-4.141 3.643a4.945 4.945 0 0 0-.268 1.684c.001.636.083 1.131.286 1.733l.153.452-.178.208C1.082 11.22.69 13.234 1.279 15.005c.181.545.33.854.622 1.296.777 1.175 1.988 2.001 3.403 2.32.373.084 1.473.122 1.856.063a6.552 6.552 0 0 0 1.42-.41l.36-.154 1.54 1.538 1.54 1.537 4.613-4.587 4.612-4.588-1.558-1.555L18.13 8.91l.16-.383c.088-.211.214-.591.281-.845.115-.434.123-.508.126-1.222.003-.658-.01-.817-.09-1.18a5.324 5.324 0 0 0-1.542-2.751 5.268 5.268 0 0 0-3.605-1.508 8.556 8.556 0 0 0-.68.004m1.583 1.11a4.402 4.402 0 0 1 2.831 2.189c.559 1.021.677 2.355.306 3.459-.054.161-.21.53-.348.821l-.251.53 1.46 1.433L19.82 12l-3.9 3.9-3.9 3.9-1.448-1.448-1.449-1.449-.552.267c-.942.455-1.469.575-2.362.538-.67-.027-1.124-.14-1.715-.428a4.398 4.398 0 0 1-2.029-5.907c.203-.415.451-.764.881-1.24l.296-.327-.205-.513c-.29-.727-.358-1.019-.385-1.658-.037-.884.092-1.496.472-2.235.664-1.292 1.879-2.15 3.336-2.358.793-.114 1.537-.003 2.438.364.262.107.493.194.512.194.019 0 .2-.147.403-.326.814-.723 1.595-1.103 2.527-1.231a5.09 5.09 0 0 1 1.623.092M17.65 17.65l-4.491 4.491.351.349.351.349 4.499-4.499 4.499-4.499-.339-.341a4.49 4.49 0 0 0-.359-.34c-.012 0-2.042 2.021-4.511 4.49'
      />
    </svg>
  )
})

SvgChef24.displayName = 'SvgChef24'
export default SvgChef24
