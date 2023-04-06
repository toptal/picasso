import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgDesignerBlue64 = forwardRef(function SvgDesignerBlue64(
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
      <g
        clipPath='url(#a)'
        fillRule='evenodd'
        clipRule='evenodd'
        fill='#204ECF'
      >
        <path
          opacity={0.1}
          d='M29.067 15.166h5.892c0 9.987 7.73 15.38 7.73 15.38l-5.372 10.201H26.683l-5.372-10.201s7.756-5.383 7.756-15.38ZM28.84 32.43a3.157 3.157 0 1 0 6.314 0 3.157 3.157 0 0 0-6.314 0Z'
        />
        <path d='M13.356 3.452h15.19v.994h-15.19v-.994Z' />
        <path d='M11.283 2.373a1.576 1.576 0 1 0 0 3.151 1.576 1.576 0 0 0 0-3.15ZM8.713 3.95a2.57 2.57 0 1 1 5.14 0 2.57 2.57 0 0 1-5.14 0ZM52.717 2.373a1.576 1.576 0 1 0 0 3.152 1.576 1.576 0 0 0 0-3.152Zm-2.57 1.576a2.57 2.57 0 1 1 5.14 0 2.57 2.57 0 0 1-5.14 0Z' />
        <path d='M50.644 4.446h-9.655v-.994h9.655v.994ZM28.049 0h7.897v7.898H28.05V0Zm.994.995v5.908h5.909V.995h-5.909ZM23.977 5.635A27.593 27.593 0 0 0 4.653 28.576l-.987-.124a28.588 28.588 0 0 1 20.02-23.769l.29.952Z' />
        <path d='M35.516 3.66A28.577 28.577 0 0 1 59.81 25.544l-.97.226A27.583 27.583 0 0 0 35.393 4.647l.124-.987ZM28.484 60.339A28.577 28.577 0 0 1 4.19 38.455l.97-.225a27.583 27.583 0 0 0 23.448 21.122l-.124.987ZM38.23 58.84a27.583 27.583 0 0 0 21.122-23.447l.988.123A28.578 28.578 0 0 1 38.454 59.81l-.225-.97Z' />
        <path d='M28.049 56.102h7.897V64H28.05v-7.898Zm.994.995v5.908h5.909v-5.908h-5.909ZM0 28.049h7.898v7.898H0v-7.898Zm.995.995v5.908h5.908v-5.908H.995ZM56.102 28.049H64v7.898h-7.898v-7.898Zm.995.995v5.908h5.908v-5.908h-5.908ZM23.334 42.523h17.332v5.027h-.995v-4.033H24.329v4.033h-.995v-5.027ZM32.003 29.77a2.66 2.66 0 1 0 0 5.318 2.66 2.66 0 0 0 0-5.319Zm-3.655 2.659a3.654 3.654 0 1 1 7.309 0 3.654 3.654 0 0 1-7.309 0Z' />
        <path d='M28.57 14.669h6.887v.497c0 4.858 1.879 8.602 3.766 11.138a20.489 20.489 0 0 0 2.593 2.875 15.75 15.75 0 0 0 1.082.904l.059.043.013.01.003.002.36.25-5.576 10.591-.88-.463 5.175-9.829c-.002 0-.003-.002-.004-.003-.22-.173-.53-.43-.903-.77a21.492 21.492 0 0 1-2.72-3.016c-1.913-2.57-3.833-6.348-3.957-11.234h-4.91c-.123 4.891-2.051 8.67-3.97 11.238a21.462 21.462 0 0 1-2.73 3.014c-.373.34-.685.596-.906.77l-.003.002 5.174 9.828-.88.463-5.577-10.591.361-.251.004-.002.014-.01.058-.043c.053-.039.132-.098.234-.178.204-.16.498-.402.852-.724a20.46 20.46 0 0 0 2.602-2.873c1.893-2.535 3.778-6.278 3.778-11.14v-.498Z' />
        <path d='M31.505 29.272V15.167h.995v14.105h-.995Z' />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgDesignerBlue64.displayName = 'SvgDesignerBlue64'
export default SvgDesignerBlue64
