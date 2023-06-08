import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgTechnologyWhite64 = forwardRef(function SvgTechnologyWhite64(
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
          fill='#231F20'
          d='M63.5 50.517H.5v7.552h63v-7.552Z'
          opacity={0.3}
        />
        <path
          fill='#fff'
          d='M64 58.569H0V5.43h64V58.57Zm-63-1h62V6.43H1V57.57Z'
        />
        <path
          fill='#fff'
          d='M15.775 31.79h-2.54a2.106 2.106 0 0 1-2.104-2.104v-7.754a2.106 2.106 0 0 1 2.104-2.104h2.54a2.107 2.107 0 0 1 2.104 2.104v7.754a2.106 2.106 0 0 1-2.104 2.104Zm-2.54-10.962a1.105 1.105 0 0 0-1.104 1.104v7.754a1.106 1.106 0 0 0 1.104 1.104h2.54a1.106 1.106 0 0 0 1.104-1.104v-7.754a1.105 1.105 0 0 0-1.104-1.104h-2.54ZM27.438 51.017h-2.54a2.106 2.106 0 0 1-2.104-2.104v-7.754a2.107 2.107 0 0 1 2.104-2.104h2.54a2.106 2.106 0 0 1 2.105 2.104v7.754a2.106 2.106 0 0 1-2.105 2.104Zm-2.54-10.962a1.106 1.106 0 0 0-1.104 1.104v7.754a1.105 1.105 0 0 0 1.104 1.104h2.54a1.105 1.105 0 0 0 1.105-1.104v-7.754a1.106 1.106 0 0 0-1.105-1.104h-2.54ZM39.102 51.017h-2.54a2.106 2.106 0 0 1-2.104-2.104v-7.754a2.107 2.107 0 0 1 2.104-2.104h2.54a2.106 2.106 0 0 1 2.104 2.104v7.754a2.106 2.106 0 0 1-2.104 2.104Zm-2.54-10.962a1.106 1.106 0 0 0-1.104 1.104v7.754a1.105 1.105 0 0 0 1.104 1.104h2.54a1.106 1.106 0 0 0 1.104-1.104v-7.754a1.106 1.106 0 0 0-1.104-1.104h-2.54ZM50.765 31.79h-2.54a2.106 2.106 0 0 1-2.104-2.104v-7.754a2.106 2.106 0 0 1 2.104-2.104h2.54a2.106 2.106 0 0 1 2.104 2.104v7.754a2.107 2.107 0 0 1-2.104 2.104Zm-2.54-10.962a1.105 1.105 0 0 0-1.104 1.104v7.754a1.105 1.105 0 0 0 1.104 1.104h2.54a1.106 1.106 0 0 0 1.104-1.104v-7.754a1.105 1.105 0 0 0-1.104-1.104h-2.54ZM29.844 30.79h-7.352v1h7.352v-1Z'
        />
        <path
          fill='#fff'
          d='M26.668 31.29h-1V20.828h-3.176v-1h4.176V31.29ZM18.181 50.017H10.83v1h7.352v-1Z'
        />
        <path
          fill='#fff'
          d='M15.005 50.517h-1V40.055h-3.176v-1h4.176v11.462ZM53.171 50.017H45.82v1h7.352v-1Z'
        />
        <path
          fill='#fff'
          d='M49.995 50.517h-1V40.055h-3.176v-1h4.176v11.462ZM41.508 30.79h-7.352v1h7.352v-1Z'
        />
        <path
          fill='#fff'
          d='M38.332 31.29h-1V20.828h-3.176v-1h4.176V31.29ZM12.157 13.65a1.687 1.687 0 1 0 0-3.374 1.687 1.687 0 0 0 0 3.375ZM6.532 13.65a1.687 1.687 0 1 0 0-3.374 1.687 1.687 0 0 0 0 3.375ZM17.782 13.65a1.687 1.687 0 1 0 0-3.374 1.687 1.687 0 0 0 0 3.375Z'
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

SvgTechnologyWhite64.displayName = 'SvgTechnologyWhite64'
export default SvgTechnologyWhite64
