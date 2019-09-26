import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import { StandardProps, ColorType } from '../Picasso'
import styles from './styles'
const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: ColorType | string
  base?: number
}
const SvgPortfolioFinance16 = forwardRef(function SvgPortfolioFinance16(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const {
    classes: availableClasses,
    className,
    style = {},
    color,
    scale,
    base
  } = props
  const classes = [availableClasses.root, className]
  let svgColor
  const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1)
  const colorClassName = kebabToCamelCase(`${color}`)

  if (!availableClasses[`${colorClassName}`]) {
    svgColor = color
  } else {
    classes.push(availableClasses[colorClassName])
  }

  const svgStyle = {
    minWidth: `${scaledSize}px`,
    minHeight: `${scaledSize}px`,
    ...style
  }

  return (
    <svg
      viewBox='0 0 16 16'
      className={cx(...classes)}
      style={svgStyle}
      color={svgColor}
      ref={ref}
    >
      <defs>
        <path
          d='M14.883 10.441L16 11l-8 4-8-4 1.117-.559L8 13.882l6.883-3.44zm0-3L16 8l-8 4-8-4 1.117-.559L8 10.882l6.883-3.44zM8 1l8 4-8 4-8-4 8-4zm0 1.118L2.236 5 8 7.882 13.764 5 8 2.118z'
          id='portfolioFinance16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='portfolioFinance16_svg__b'>
          <use xlinkHref='#portfolioFinance16_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#portfolioFinance16_svg__a' />
        <g mask='url(#portfolioFinance16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgPortfolioFinance16.displayName = 'SvgPortfolioFinance16'
export default withStyles(styles)(SvgPortfolioFinance16)
