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
const SvgCurrencyCoin16 = forwardRef(function SvgCurrencyCoin16(
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
        d='M7.467.017a8.028 8.028 0 0 0-5.859 3.176C.799 4.26.296 5.477.073 6.906c-.082.523-.082 1.665 0 2.188.342 2.194 1.403 3.995 3.122 5.299 1.062.806 2.286 1.312 3.711 1.534.523.082 1.665.082 2.188 0 1.944-.303 3.596-1.179 4.836-2.565 1.1-1.229 1.735-2.587 1.997-4.268.082-.523.082-1.665 0-2.188-.222-1.425-.728-2.649-1.534-3.711A7.994 7.994 0 0 0 9 .066 12.585 12.585 0 0 0 7.467.017M9.04 1.078c2.791.433 5.064 2.493 5.741 5.203.161.643.192.923.192 1.719 0 .555-.011.775-.049 1.027a7.016 7.016 0 0 1-5.487 5.823c-.889.19-1.985.19-2.874 0-2.611-.556-4.687-2.542-5.336-5.103-.168-.664-.2-.94-.2-1.747 0-.807.032-1.083.2-1.747a7.006 7.006 0 0 1 5.026-5.026c.22-.056.544-.121.72-.144l.4-.054c.201-.027 1.401.008 1.667.049m-1.333 2.84c0 .477.02.435-.227.469-.203.028-.537.14-.762.256-.668.346-1.038.947-1.038 1.686 0 .471.138.839.436 1.157.281.3.638.5 1.252.702l.339.111v2.32l-.1-.018c-.421-.077-.999-.368-1.428-.718l-.155-.126-.099.08a6.304 6.304 0 0 0-.359.342l-.26.263.1.094c.522.492 1.423.948 2.107 1.066l.194.033v.872h.986v-.426c0-.421.001-.427.06-.438.842-.153 1.319-.397 1.663-.851.636-.839.522-1.967-.264-2.606-.214-.174-.721-.425-1.125-.557l-.32-.104L8.7 6.454l-.007-1.072.087.019c.307.065.753.302 1.003.533l.157.146.37-.31c.204-.171.373-.319.378-.33.004-.011-.094-.114-.218-.23A3.347 3.347 0 0 0 9 4.426l-.293-.074-.008-.429-.007-.43h-.985v.425m0 2.388v.946l-.194-.069c-.416-.15-.665-.318-.768-.519-.152-.298-.049-.771.216-.994.151-.127.548-.299.712-.308.026-.002.034.204.034.944m1.28 2.374c.443.178.647.328.761.561.066.134.071.166.06.392-.012.258-.055.381-.2.571-.134.177-.489.359-.815.42l-.1.018V9.615c0-.745.009-1.028.03-1.028.017 0 .135.042.264.093'
      />
    </svg>
  )
})

SvgCurrencyCoin16.displayName = 'SvgCurrencyCoin16'
export default SvgCurrencyCoin16
