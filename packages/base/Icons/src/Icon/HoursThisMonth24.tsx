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
const SvgHoursThisMonth24 = forwardRef(function SvgHoursThisMonth24(
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
        d='M5 2v1H0v18h12.026l.196.29c.108.159.422.517.697.793.945.95 1.998 1.515 3.361 1.803.572.121 1.743.131 2.34.02a6.43 6.43 0 0 0 3.462-1.824c.784-.783 1.28-1.591 1.609-2.622.226-.708.289-1.135.289-1.96 0-1.052-.175-1.854-.606-2.779-.592-1.27-1.763-2.452-3.034-3.062-1.055-.506-2.251-.729-3.366-.626a5.975 5.975 0 0 0-1.528.31c-.983.327-1.766.814-2.529 1.575-.782.779-1.278 1.588-1.608 2.622-.228.715-.289 1.133-.288 1.98.001.845.075 1.315.318 2.038.078.23.141.423.141.43 0 .007-2.358.012-5.24.012H1V8h22v3h1V3h-5V1h-1v2H6V1H5v1m0 3v1h1V4h12v2h1V4h4v3H1V4h4v1m13.517 7.1a5.464 5.464 0 0 1 2.865 1.518c.795.796 1.3 1.753 1.523 2.887.097.492.098 1.507.001 1.99-.227 1.14-.73 2.092-1.524 2.886a5.538 5.538 0 0 1-2.842 1.523c-.505.105-1.575.105-2.08 0a5.538 5.538 0 0 1-2.842-1.523c-.794-.794-1.298-1.747-1.524-2.886-.097-.488-.097-1.502 0-1.99.226-1.139.73-2.092 1.524-2.887.901-.901 1.995-1.422 3.342-1.593.276-.035 1.226.011 1.557.075M17 15v2h-2v1h3v-5h-1v2'
      />
    </svg>
  )
})

SvgHoursThisMonth24.displayName = 'SvgHoursThisMonth24'
export default SvgHoursThisMonth24
