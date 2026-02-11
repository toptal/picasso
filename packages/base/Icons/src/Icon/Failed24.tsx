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
const SvgFailed24 = forwardRef(function SvgFailed24(
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
        d='M10.06.885c-.47.058-.844.254-1.17.613C8.67 1.742.217 16.365.103 16.7c-.038.11-.078.335-.09.5-.062.862.5 1.68 1.357 1.974l.25.086 5.809.011 5.808.011.012.422.011.422 2.66 1.542c1.463.849 2.678 1.543 2.7 1.543.022 0 1.237-.693 2.7-1.54l2.66-1.54v-6.229l-2.62-1.51a177.401 177.401 0 0 0-2.692-1.535c-.048-.016-.245.074-.57.26a6.208 6.208 0 0 1-.528.282c-.016 0-1.298-2.197-2.848-4.882-2.504-4.335-2.844-4.905-3.04-5.092-.466-.443-.988-.617-1.622-.54m.696 1.089c.096.047.225.149.287.226.182.23 5.656 9.734 5.615 9.749-.021.008-.794.452-1.718.987l-1.68.971-.01 2.187-.011 2.186H7.625c-3.6 0-5.691-.014-5.83-.04a.967.967 0 0 1-.654-.458.948.948 0 0 1-.024-.902A4366.04 4366.04 0 0 1 9.544 2.27c.249-.386.77-.514 1.212-.296M9.84 9.641v3.361l.49-.011.49-.011.01-3.35.01-3.35h-1v3.361m10.78 3.479a75.33 75.33 0 0 1 1.808 1.055c.036.034-.118.14-.629.435-.372.215-.694.39-.714.39-.067 0-3.816-2.179-3.814-2.217.001-.02.305-.212.675-.426l.674-.39.12.072c.066.039.912.526 1.88 1.081m-2.48 1.356c1.034.597 1.885 1.1 1.891 1.117.008.024-1.213.759-1.391.838-.014.006-.894-.493-1.956-1.108-1.658-.959-1.921-1.124-1.858-1.163.526-.321 1.363-.79 1.394-.781.022.007.886.501 1.92 1.097m-8.3.464v.74h1V14.2h-1v.74m6.371 1.26 1.906 1.1.001 2.233c.001 1.421-.012 2.229-.037 2.22-.021-.007-.894-.508-1.939-1.113l-1.901-1.1-.001-2.233c0-1.229.015-2.228.033-2.22.018.007.89.508 1.938 1.113M23 17.311v2.232l-1.918 1.108c-1.055.61-1.928 1.109-1.94 1.109-.012 0-.021-1.003-.02-2.23l.001-2.23 1.929-1.11c1.06-.61 1.932-1.11 1.938-1.11.006 0 .01 1.004.01 2.231'
      />
    </svg>
  )
})

SvgFailed24.displayName = 'SvgFailed24'
export default SvgFailed24
