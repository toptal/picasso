import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgDesignWhite64 = forwardRef(function SvgDesignWhite64(
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
      viewBox='0 0 64 65'
      fill='none'
      className={className}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <g clipPath='url(#a)'>
        <path
          opacity={0.3}
          d='M35.196 10.46H32v19.915a5.818 5.818 0 0 1 0 11.638v10.08h9.179l5.819-15.899L35.196 10.46ZM48.309 58.608H15.69v5.43H48.31v-5.43Z'
          fill='#231F20'
        />
        <path
          d='M61.258 34.507h-1a28.143 28.143 0 0 0-23.629-27.88l.163-.987a29.138 29.138 0 0 1 24.466 28.867ZM3.742 34.507h-1A29.138 29.138 0 0 1 27.208 5.64l.163.986A28.142 28.142 0 0 0 3.742 34.507Z'
          fill='#fff'
        />
        <path
          d='M37.211 10.96H26.789V.54h10.422V10.96Zm-9.422-1h8.422V1.54h-8.422V9.96Z'
          fill='#fff'
        />
        <path
          d='M48.809 64.039h-1V52.593h-7.346l5.995-16.377L34.876 10.96h-5.751L17.543 36.216l5.994 16.377h-7.345v11.446h-1V51.593h6.914l-5.644-15.42L28.483 9.96h7.034l12.021 26.212-5.644 15.42h6.915v12.446ZM27.29 5.25H9.19v1h18.1v-1ZM54.81 5.25H36.712v1h18.1v-1Z'
          fill='#fff'
        />
        <path
          d='M32 42.513a6.32 6.32 0 1 1 6.319-6.32A6.326 6.326 0 0 1 32 42.514Zm0-11.638a5.32 5.32 0 1 0 5.319 5.319A5.325 5.325 0 0 0 32 30.875ZM41.179 51.593H22.82v1H41.18v-1Z'
          fill='#fff'
        />
        <path
          d='M32.5 10.46h-1v19.915h1V10.46ZM4.845 10.594a4.845 4.845 0 1 1 0-9.69 4.845 4.845 0 0 1 0 9.69Zm0-8.69a3.845 3.845 0 1 0 0 7.69 3.845 3.845 0 0 0 0-7.69ZM59.155 10.594a4.845 4.845 0 1 1 0-9.69 4.845 4.845 0 0 1 0 9.69Zm0-8.69a3.845 3.845 0 1 0 0 7.69 3.845 3.845 0 0 0 0-7.69Z'
          fill='#fff'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' transform='translate(0 .539)' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgDesignWhite64.displayName = 'SvgDesignWhite64'
export default SvgDesignWhite64
