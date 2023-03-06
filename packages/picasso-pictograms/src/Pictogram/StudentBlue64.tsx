import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgStudentBlue64 = forwardRef(function SvgStudentBlue64(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const { className, style = {}, scale, base, 'data-testid': testId } = props
  const scaledSize = base || SIZE * Math.ceil(scale || 1)

  const svgStyle = {
    minWidth: `${scaledSize}px`,
    minHeight: `${scaledSize}px`,
    ...style,
  }

  return (
    <svg
      viewBox='0 0 64 64'
      fill='none'
      className={className}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <g clipPath='url(#a)'>
        <path
          opacity={0.15}
          d='M32 26.392a10.515 10.515 0 1 0 0-21.03 10.515 10.515 0 0 0 0 21.03Z'
          fill='#183A9E'
        />
        <path
          opacity={0.15}
          d='M32 26.392a21.23 21.23 0 0 0-21.23 21.23h15.96a5.27 5.27 0 0 1 5.27 5.27 5.27 5.27 0 0 1 5.27-5.27h15.96a21.144 21.144 0 0 0-2.136-9.291l-5.253 5.27-3.916.999.998-3.916 5.95-5.948A21.194 21.194 0 0 0 32 26.392Z'
          fill='#183A9E'
        />
        <path
          d='M32 59.138a7.487 7.487 0 0 1-5.455-2.37H.5v-1H26.99l.15.169a6.465 6.465 0 0 0 9.718 0l.15-.17h26.49v1H37.456A7.485 7.485 0 0 1 32 59.138Z'
          fill='#204ECF'
        />
        <path
          d='m60.94 56.507-4.566-8.385H37.271a4.777 4.777 0 0 0-4.771 4.77h-1a4.776 4.776 0 0 0-4.771-4.77H7.626L3.06 56.507l-.878-.479 4.85-8.906H26.73a5.78 5.78 0 0 1 5.27 3.422 5.78 5.78 0 0 1 5.272-3.422h19.697l4.85 8.906-.878.479ZM41.233 45.292l1.24-4.865 15.03-15.03a2.563 2.563 0 0 1 3.625 3.625l-15.03 15.03-4.865 1.24Zm2.141-4.352-.756 2.967 2.967-.756L60.42 28.314a1.563 1.563 0 0 0-2.21-2.21L43.373 40.94ZM32 26.892a11.015 11.015 0 1 1 11.015-11.015A11.026 11.026 0 0 1 32 26.892Zm0-21.03a10.015 10.015 0 1 0 10.015 10.015A10.026 10.026 0 0 0 32 5.862Z'
          fill='#204ECF'
        />
        <path
          d='M53.73 47.622h-1a20.531 20.531 0 0 0-2.085-9.072l.898-.438a21.514 21.514 0 0 1 2.187 9.51ZM11.27 47.621h-1a21.73 21.73 0 0 1 39-13.19l-.795.608A20.731 20.731 0 0 0 11.27 47.62Z'
          fill='#204ECF'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgStudentBlue64.displayName = 'SvgStudentBlue64'
export default SvgStudentBlue64
