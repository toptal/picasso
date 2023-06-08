import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgOnlineBlue64 = forwardRef(function SvgOnlineBlue64(
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
          fill='#183A9E'
          d='M53.814 47.974H10.186v-9.452H29.01L32 41.341l3.335-2.819h18.479v9.452ZM38.081 47.974H25.92v7.069H38.08v-7.069Z'
          opacity={0.15}
        />
        <path
          fill='#204ECF'
          d='M32.01 14.731h-.02c.003.068.01.135.01.204 0-.069.007-.136.01-.204Z'
          opacity={0.15}
        />
        <path
          fill='#204ECF'
          d='M32.5 43.405h-1a4.388 4.388 0 0 0-4.383-4.383H9.686V9.896h17.43A5.391 5.391 0 0 1 32 13.015a5.389 5.389 0 0 1 4.883-3.119h17.431v29.126H36.883a4.388 4.388 0 0 0-4.383 4.383Zm-21.814-5.383h16.43A5.39 5.39 0 0 1 32 41.14a5.39 5.39 0 0 1 4.883-3.118h16.431V10.897H36.883A4.388 4.388 0 0 0 32.5 15.28h-1a4.388 4.388 0 0 0-4.383-4.383H10.686v27.125Z'
        />
        <path
          fill='#204ECF'
          d='M32.5 15.28h-1v28.125h1V15.28ZM39.813 29.315V17.013l9.03 8.357-9.03 3.945Zm1-10.014v8.486l6.228-2.722-6.227-5.764Z'
        />
        <path
          fill='#204ECF'
          d='m44.586 26.684-.917.4 2.458 5.622.916-.4-2.457-5.622Z'
        />
        <path
          fill='#204ECF'
          d='M61.328 48.474H2.672A2.675 2.675 0 0 1 0 45.802V2.672A2.675 2.675 0 0 1 2.672 0h58.656A2.675 2.675 0 0 1 64 2.672v43.13a2.675 2.675 0 0 1-2.672 2.672ZM2.672 1A1.674 1.674 0 0 0 1 2.672v43.13a1.674 1.674 0 0 0 1.672 1.672h58.656A1.674 1.674 0 0 0 63 45.802V2.672A1.674 1.674 0 0 0 61.328 1H2.672Z'
        />
        <path
          fill='#204ECF'
          d='M38.581 47.974h-1v11.627h1V47.974ZM26.419 47.974h-1v11.627h1V47.974ZM47.619 63H16.38v1H47.62v-1Z'
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

SvgOnlineBlue64.displayName = 'SvgOnlineBlue64'
export default SvgOnlineBlue64
