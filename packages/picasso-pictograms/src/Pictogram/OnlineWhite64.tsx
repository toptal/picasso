import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgOnlineWhite64 = forwardRef(function SvgOnlineWhite64(
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
          opacity={0.3}
          d='M53.814 48.116H10.186v-9.452H29.01L32 41.483l3.335-2.82h18.479v9.453ZM38.081 48.116H25.92v7.068H38.08v-7.068Z'
          fill='#231F20'
        />
        <path
          opacity={0.15}
          d='M32.01 14.873h-.02c.003.068.01.135.01.204 0-.069.007-.136.01-.204Z'
          fill='#fff'
        />
        <path
          d='M32.5 43.547h-1a4.388 4.388 0 0 0-4.383-4.383H9.686V10.038h17.43A5.39 5.39 0 0 1 32 13.156a5.389 5.389 0 0 1 4.883-3.118h17.431v29.126H36.883a4.388 4.388 0 0 0-4.383 4.383Zm-21.814-5.383h16.43A5.39 5.39 0 0 1 32 41.282a5.39 5.39 0 0 1 4.883-3.118h16.431V11.038H36.883a4.388 4.388 0 0 0-4.383 4.383h-1a4.388 4.388 0 0 0-4.383-4.383H10.686v27.126Z'
          fill='#fff'
        />
        <path
          d='M32.5 15.421h-1v28.126h1V15.42ZM39.813 29.456V17.154l9.03 8.357-9.03 3.945Zm1-10.014v8.486l6.228-2.722-6.227-5.764Z'
          fill='#fff'
        />
        <path
          d='m44.586 26.825-.917.4 2.458 5.623.916-.4-2.457-5.623Z'
          fill='#fff'
        />
        <path
          d='M61.328 48.616H2.672A2.675 2.675 0 0 1 0 45.943V2.814A2.675 2.675 0 0 1 2.672.142h58.656A2.675 2.675 0 0 1 64 2.814v43.13a2.675 2.675 0 0 1-2.672 2.672ZM2.672 1.142A1.674 1.674 0 0 0 1 2.814v43.13a1.674 1.674 0 0 0 1.672 1.672h58.656A1.674 1.674 0 0 0 63 45.943V2.814a1.674 1.674 0 0 0-1.672-1.672H2.672Z'
          fill='#fff'
        />
        <path
          d='M38.581 48.116h-1v11.627h1V48.116ZM26.419 48.116h-1v11.627h1V48.116ZM47.619 63.142H16.38v1H47.62v-1Z'
          fill='#fff'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' transform='translate(0 .142)' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgOnlineWhite64.displayName = 'SvgOnlineWhite64'
export default SvgOnlineWhite64
