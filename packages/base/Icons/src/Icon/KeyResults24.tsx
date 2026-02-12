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
const SvgKeyResults24 = forwardRef(function SvgKeyResults24(
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
        d='M18.96 2.221v1.261l-.31-.236c-.791-.603-1.902-1.219-2.783-1.544C12.489.454 8.77.903 5.821 2.912c-.679.463-.952.692-1.622 1.365-1.28 1.285-2.131 2.678-2.676 4.384-.372 1.164-.5 2.017-.5 3.339s.128 2.175.5 3.339c.552 1.729 1.397 3.104 2.716 4.422 1.318 1.319 2.693 2.164 4.422 2.716 1.164.372 2.017.5 3.339.5s2.175-.128 3.339-.5c1.729-.552 3.104-1.397 4.422-2.716.901-.9 1.534-1.763 2.06-2.805 1.873-3.711 1.478-8.224-1.007-11.526l-.294-.39h2.52V.96h-4.08v1.261m-6.12-.18a9.945 9.945 0 0 1 4.661 1.618c.438.291 1.027.746 1.136.877.052.063-.04.166-.997 1.124l-1.055 1.055-.182-.153c-.695-.58-1.74-1.105-2.663-1.336-2.241-.56-4.509-.034-6.286 1.458-1.773 1.488-2.698 3.889-2.394 6.21.503 3.833 4.017 6.546 7.834 6.046 3.594-.471 6.241-3.598 6.094-7.2a8.873 8.873 0 0 0-.09-.94c-.193-1.101-.722-2.281-1.399-3.124l-.212-.263 1.054-1.054c.957-.956 1.06-1.048 1.123-.996.131.109.586.698.878 1.136.845 1.273 1.371 2.7 1.586 4.301.083.621.061 2.034-.041 2.672-.106.66-.252 1.261-.432 1.777a10.013 10.013 0 0 1-7.558 6.566c-4.885.946-9.708-1.843-11.352-6.566a10.592 10.592 0 0 1-.432-1.777c-.124-.764-.124-2.18 0-2.944.262-1.62.803-2.977 1.693-4.248 2.049-2.926 5.515-4.552 9.034-4.239m.32 4.078c.94.192 1.748.56 2.531 1.154l.191.145-1.064 1.064-1.063 1.063-.416-.208c-.512-.257-1.001-.361-1.516-.325-.461.032-.666.089-1.123.309a2.846 2.846 0 0 0-1.004.767c-.709.829-.888 2.017-.462 3.063a3.046 3.046 0 0 0 1.615 1.615 2.998 2.998 0 0 0 4.089-2.185 3 3 0 0 0-.378-2.133l-.118-.188 1.068-1.069 1.068-1.07.09.11c.371.449.819 1.265 1.011 1.841.222.666.293 1.117.295 1.888.003 1.032-.149 1.745-.551 2.585-.839 1.751-2.321 2.917-4.249 3.342-.571.126-1.777.126-2.348 0-2.485-.548-4.278-2.391-4.736-4.867-.09-.489-.09-1.551 0-2.04.304-1.645 1.219-3.052 2.57-3.955a5.92 5.92 0 0 1 2.54-.967c.527-.077 1.42-.049 1.96.061'
      />
    </svg>
  )
})

SvgKeyResults24.displayName = 'SvgKeyResults24'
export default SvgKeyResults24
