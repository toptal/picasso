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
const SvgSticker24 = forwardRef(function SvgSticker24(
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
        d='M11.32 1.024c-2.157.19-3.814.752-5.434 1.843a10.965 10.965 0 0 0-4.362 5.79c-.373 1.168-.501 2.019-.501 3.343 0 .727.018 1.104.07 1.46.286 1.949.981 3.631 2.137 5.177.455.607 1.526 1.678 2.133 2.133 1.546 1.156 3.228 1.851 5.177 2.137.672.098 2.248.098 2.92 0 1.949-.286 3.631-.981 5.177-2.137.607-.455 1.678-1.526 2.133-2.133a11.01 11.01 0 0 0 2.114-5.045c.11-.733.141-1.966.065-2.666l-.058-.535-4.635-4.635L13.62 1.12l-.3-.04c-.323-.043-1.705-.082-2-.056M12 2.23c.001.707.183 1.845.422 2.635a9.762 9.762 0 0 0 2.517 4.196 9.762 9.762 0 0 0 4.196 2.517c.793.24 1.928.421 2.641.422h.235l-.027.49c-.203 3.586-2.222 6.74-5.361 8.373A9.988 9.988 0 0 1 3.806 17.72c-.89-1.271-1.431-2.628-1.693-4.248-.124-.764-.124-2.18 0-2.944.262-1.62.803-2.977 1.693-4.248a10.007 10.007 0 0 1 7.924-4.273L12 2v.23m5.549 4.223c2.399 2.402 4.371 4.408 4.382 4.457.02.085.009.09-.205.09-.125 0-.455-.027-.734-.059a8.979 8.979 0 0 1-7.069-4.997c-.549-1.123-.823-2.175-.906-3.469l-.027-.426.098.019c.065.012 1.598 1.519 4.461 4.385'
      />
    </svg>
  )
})

SvgSticker24.displayName = 'SvgSticker24'
export default SvgSticker24
