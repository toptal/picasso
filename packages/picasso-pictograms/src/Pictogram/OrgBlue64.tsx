import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgOrgBlue64 = forwardRef(function SvgOrgBlue64(
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
          d='M21.297 21.251H8.941v6.178h12.356v-6.178ZM55.06 21.251H42.702v6.178h12.356v-6.178ZM63.5 51.89H51.144v6.179H63.5v-6.178ZM46.619 51.89H34.263v6.179h12.356v-6.178ZM29.738 51.89H17.38v6.179h12.357v-6.178ZM12.856 51.89H.5v6.179h12.356v-6.178Z'
          opacity={0.15}
        />
        <path
          fill='#204ECF'
          d='M21.797 27.93H8.44V14.572h13.357V27.93Zm-12.357-1h11.357V15.572H9.44V26.93ZM55.56 27.93H42.203V14.572H55.56V27.93Zm-12.357-1H54.56V15.572H43.203V26.93ZM13.357 58.569H0V45.212h13.357V58.57ZM1 57.569h11.357V46.212H1V57.57ZM30.238 58.569H16.88V45.212h13.357V58.57Zm-12.357-1h11.357V46.212H17.88V57.57ZM47.119 58.569H33.762V45.212H47.12V58.57Zm-12.357-1H46.12V46.212H34.762V57.57ZM64 58.569H50.644V45.212H64V58.57Zm-12.356-1H63V46.212H51.644V57.57Z'
        />
        <path
          fill='#204ECF'
          d='M49.381 15.073h-1V6.43H15.619v8.642h-1V5.43h34.762v9.642ZM24.06 45.712h-1v-8.641H7.178v8.641h-1v-9.641H24.06v9.641ZM57.822 45.712h-1v-8.641H40.94v8.641h-1v-9.641h17.882v9.641Z'
        />
        <path
          fill='#204ECF'
          d='M49.381 27.43h-1v9.14h1v-9.14ZM15.619 27.43h-1v9.14h1v-9.14Z'
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

SvgOrgBlue64.displayName = 'SvgOrgBlue64'
export default SvgOrgBlue64
