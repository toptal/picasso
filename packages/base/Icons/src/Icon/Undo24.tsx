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
const SvgUndo24 = forwardRef(function SvgUndo24(
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
        d='M11.08 2.547c-3.967.407-7.248 3.198-8.261 7.028a9.538 9.538 0 0 0-.001 4.845c.448 1.68 1.233 3.037 2.479 4.283.826.825 1.542 1.342 2.523 1.818 1.388.674 2.654.967 4.18.967 2.142 0 4.058-.653 5.82-1.981.412-.311 1.376-1.275 1.687-1.687 1.033-1.369 1.651-2.831 1.896-4.48.103-.691.113-1.854.023-2.521-.234-1.726-.937-3.404-1.974-4.711-.299-.376-1.004-1.101-1.326-1.362l-.253-.206 1.813-.02L21.5 4.5l.011-.49.011-.49H16.479l.011 2.49.01 2.49h1l.02-1.476.02-1.475.313.292c1.049.98 1.902 2.386 2.313 3.815.381 1.322.418 3.003.094 4.332a8.526 8.526 0 0 1-4.409 5.584 8.499 8.499 0 0 1-5.929.665c-3.371-.85-5.901-3.694-6.341-7.129-.12-.931-.061-2.16.146-3.048.845-3.629 4.08-6.356 7.743-6.528l.53-.024V2.52l-.39.006a9.584 9.584 0 0 0-.53.021'
      />
    </svg>
  )
})

SvgUndo24.displayName = 'SvgUndo24'
export default SvgUndo24
