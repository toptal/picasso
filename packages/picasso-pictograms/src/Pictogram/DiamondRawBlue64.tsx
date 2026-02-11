import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgDiamondRawBlue64 = forwardRef(function SvgDiamondRawBlue64(
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
      fill='none'
      viewBox='0 0 64 64'
      className={className}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <g clipPath='url(#a)'>
        <path
          fill='#183A9C'
          d='M22.6 24.17c-.32.21-.7.33-1.1.33-1.1 0-2-.9-2-2 0-.17.02-.34.07-.5H4.43c.04.16.07.33.07.5 0 .74-.4 1.37-.99 1.72l26.27 26.27c.33-.55.9-.92 1.56-.97L22.6 24.17ZM58.5 22.5c0-.17.03-.34.07-.5H43.43c.05.16.07.33.07.5 0 1.1-.9 2-2 2-.4 0-.78-.12-1.1-.33l-8.74 25.35c.66.05 1.23.42 1.56.97l26.27-26.27c-.59-.35-.99-.98-.99-1.72ZM41.36 20.51 37.59 9.18c-.31.2-.68.32-1.08.32-1.1 0-2-.9-2-2 0-.17.03-.34.07-.5h-6.14c.04.16.07.33.07.5 0 1.1-.9 2-2 2-.4 0-.77-.12-1.08-.32l-3.77 11.33c1.04.07 1.86.94 1.86 1.99 0 .17-.02.34-.07.5h16.14c-.05-.16-.07-.33-.07-.5 0-1.05.82-1.92 1.86-1.99h-.02Z'
          opacity={0.15}
        />
        <path
          stroke='#204ECC'
          strokeMiterlimit={10}
          d='m4.97 24.97 24.06 24.06M15.03 9.97 4.97 20.03M23 7.5h-2M33 7.5h-3M42 7.5h-2M58.03 20.03 47.97 9.97M33.97 49.03l24.06-24.06M6 22.5h12M45 22.5h12M25 22.5h13M17 63.5h29M2.5 24.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM21.5 24.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM17.5 9.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM26.5 9.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM45.5 9.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM36.5 9.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM60.5 24.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM41.5 24.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM31.5 53.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM22.64 25.81l7.72 22.38M22.61 19.18l2.78-8.36M37.61 10.82l2.78 8.36M40.36 25.81l-7.72 22.38'
        />
        <path
          fill='#204ECD'
          d='m32.51 53.22.17.17-.08-.22s-.06.03-.09.05ZM30.32 53.39l.17-.17s-.06-.03-.09-.05l-.08.22Z'
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

SvgDiamondRawBlue64.displayName = 'SvgDiamondRawBlue64'
export default SvgDiamondRawBlue64
