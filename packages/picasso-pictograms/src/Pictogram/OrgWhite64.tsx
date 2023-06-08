import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgOrgWhite64 = forwardRef(function SvgOrgWhite64(
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
          d='M21.297 21.393H8.941v6.178h12.356v-6.178ZM55.06 21.393H42.702v6.178h12.356v-6.178ZM63.5 52.032H51.144v6.179H63.5v-6.178ZM46.619 52.032H34.263v6.179h12.356v-6.178ZM29.738 52.032H17.38v6.179h12.357v-6.178ZM12.856 52.032H.5v6.179h12.356v-6.178Z'
          opacity={0.3}
        />
        <path
          fill='#fff'
          d='M21.797 28.07H8.44V14.716h13.357V28.07Zm-12.357-1h11.357V15.716H9.44V27.07ZM55.56 28.07H42.203V14.716H55.56V28.07Zm-12.357-1H54.56V15.716H43.203V27.07ZM13.357 58.71H0V45.355h13.357v13.357ZM1 57.71h11.357V46.355H1v11.357ZM30.238 58.71H16.88V45.355h13.357v13.357Zm-12.357-1h11.357V46.355H17.88v11.357ZM47.119 58.71H33.762V45.355H47.12v13.357Zm-12.357-1H46.12V46.355H34.762v11.357ZM64 58.71H50.644V45.355H64v13.357Zm-12.356-1H63V46.355H51.644v11.357Z'
        />
        <path
          fill='#fff'
          d='M49.381 15.214h-1V6.573H15.619v8.641h-1V5.573h34.762v9.641ZM24.06 45.854h-1v-8.641H7.178v8.64h-1v-9.64H24.06v9.64ZM57.822 45.854h-1v-8.641H40.94v8.64h-1v-9.64h17.882v9.64Z'
        />
        <path
          fill='#fff'
          d='M49.381 27.57h-1v9.142h1v-9.141ZM15.619 27.57h-1v9.142h1v-9.141Z'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 .142h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgOrgWhite64.displayName = 'SvgOrgWhite64'
export default SvgOrgWhite64
