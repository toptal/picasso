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
const SvgInTransit24 = forwardRef(function SvgInTransit24(
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
        d='M0 10.88v7.84l1.65.001 1.65.001.112.35c.266.835.905 1.469 1.768 1.757.28.093.385.106.84.107.461.001.555-.011.824-.105a2.758 2.758 0 0 0 1.117-.707c.327-.331.594-.781.693-1.169l.055-.215 3.78-.01 3.779-.01.112.344a2.802 2.802 0 0 0 1.76 1.761c.287.1.373.112.84.111.454-.001.561-.015.84-.107a2.735 2.735 0 0 0 1.329-.929c.21-.277.423-.698.496-.982l.05-.198H24v-6.359l-1.516-2.87-1.515-2.871-3.025-.01-3.024-.011V3.04H0v7.84m13.88 0v6.84H8.732l-.112-.342a2.726 2.726 0 0 0-2.48-1.886 2.493 2.493 0 0 0-1.331.269c-.732.362-1.263 1.001-1.451 1.749l-.053.21H1V4.04h12.88v6.84M8.625 7.886l-.352.327 1.064 1.064c.584.585 1.063 1.077 1.063 1.093 0 .017-1.602.03-3.56.03H3.28v1H10.419L9.36 12.46l-1.059 1.06.349.35.35.35 1.67-1.67 1.67-1.67-1.66-1.66a93.796 93.796 0 0 0-1.681-1.66c-.012 0-.18.147-.374.326m13.051 2.224L23 12.62v5.1l-.65-.001h-.65l-.111-.357c-.212-.686-.694-1.243-1.369-1.583a2.436 2.436 0 0 0-1.36-.286c-.754.038-1.278.276-1.821.823a2.546 2.546 0 0 0-.699 1.174l-.066.23H14.92V7.6h5.432l1.324 2.51m-15.16 6.446a1.735 1.735 0 0 1 .702 2.908c-.914.892-2.414.528-2.857-.692-.077-.211-.088-.307-.074-.64.014-.344.032-.424.148-.657.221-.447.704-.846 1.15-.951.268-.062.672-.049.931.032m13.215.096c.46.227.772.584.928 1.062.112.343.074.869-.089 1.216a1.746 1.746 0 0 1-2.485.778c-1.088-.65-1.113-2.263-.045-2.948.332-.213.603-.283 1.031-.266.329.013.404.031.66.158'
      />
    </svg>
  )
})

SvgInTransit24.displayName = 'SvgInTransit24'
export default SvgInTransit24
