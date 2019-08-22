import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const SvgPortfolioDesigner16 = forwardRef(function SvgPortfolioDesigner16(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const { classes, className, style = {}, color, scale, base } = props
  const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1)
  const svgStyle = {
    minWidth: `${scaledSize}px`,
    minHeight: `${scaledSize}px`,
    ...style
  }

  return (
    <svg
      viewBox='0 0 16 16'
      className={cx(classes.root, className)}
      style={svgStyle}
      color={color}
      ref={ref}
    >
      <defs>
        <path
          d='M0 0h7v7H0V0zm1 1v5h5V1H1zm8-1h7v7H9V0zm1 1v5h5V1h-5zM0 9h7v7H0V9zm1 6h5v-5H1v5zm8-6h7v7H9V9zm1 6h5v-5h-5v5z'
          id='portfolioDesigner16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='portfolioDesigner16_svg__b'>
          <use xlinkHref='#portfolioDesigner16_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#portfolioDesigner16_svg__a' />
        <g mask='url(#portfolioDesigner16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgPortfolioDesigner16.displayName = 'SvgPortfolioDesigner16'
export default withStyles(styles)(SvgPortfolioDesigner16)
