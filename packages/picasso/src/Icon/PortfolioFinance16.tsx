import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { StandardProps } from '@toptal/picasso-shared'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
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
  const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1)
  const colorClassName = kebabToCamelCase(`${color}`)

  if (availableClasses[colorClassName]) {
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
      ref={ref}
    >
      <path d='M14.883 10.441L16 11l-8 4-8-4 1.117-.559L8 13.882l6.883-3.44zm0-3L16 8l-8 4-8-4 1.117-.559L8 10.882l6.883-3.44zM8 1l8 4-8 4-8-4 8-4zm0 1.118L2.236 5 8 7.882 13.764 5 8 2.118z' />
    </svg>
  )
})

SvgPortfolioFinance16.displayName = 'SvgPortfolioFinance16'
export default withStyles(styles)(SvgPortfolioFinance16)
