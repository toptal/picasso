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
const SvgShoppingBasket24 = forwardRef(function SvgShoppingBasket24(
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
        d='M11.521.544a5.53 5.53 0 0 0-4.376 3.35c-.168.407-.328.99-.375 1.364l-.029.238-1.881.012-1.881.013-.229.108a1.531 1.531 0 0 0-.813.873C1.864 6.709 0 20.962 0 21.314c0 .598.275 1.22.746 1.687.364.361.685.547 1.154.667.316.081.498.082 10.325.081 11.079 0 10.245.021 10.842-.274.73-.36 1.238-1.08 1.357-1.924.043-.309.008-.603-.911-7.634-.873-6.685-.965-7.333-1.065-7.551a1.61 1.61 0 0 0-.731-.728l-.238-.117-1.884-.013-1.884-.012-.025-.154c-.233-1.42-.708-2.367-1.638-3.269A5.463 5.463 0 0 0 13.271.605c-.403-.083-1.349-.115-1.75-.061M13.15 1.6a4.498 4.498 0 0 1 3.488 3.577l.06.323H7.749l.027-.177a4.536 4.536 0 0 1 3.717-3.762c.434-.071 1.229-.052 1.657.039M6.708 7.772c0 1.413.013 1.494.258 1.644.165.1.327.107.494.021.24-.124.248-.179.248-1.622V6.5h9v1.272c0 1.413.013 1.494.258 1.644.165.1.327.107.494.021.24-.124.248-.179.248-1.622V6.5h1.734c1.922 0 1.963.005 2.083.267.07.151 1.898 14.076 1.901 14.485.005.498-.238.96-.65 1.237-.418.281.397.261-10.55.261-9.863 0-9.927-.001-10.2-.085-.523-.161-.944-.685-1.007-1.251-.018-.168.216-2.065.913-7.402.516-3.946.959-7.215.985-7.263a.586.586 0 0 1 .179-.168c.126-.076.224-.081 1.873-.081h1.739v1.272'
      />
    </svg>
  )
})

SvgShoppingBasket24.displayName = 'SvgShoppingBasket24'
export default SvgShoppingBasket24
