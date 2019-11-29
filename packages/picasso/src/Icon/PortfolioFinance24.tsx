import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { StandardProps } from '@toptal/picasso-shared'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const SvgPortfolioFinance24 = forwardRef(function SvgPortfolioFinance24(
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
      viewBox='0 0 24 24'
      className={cx(...classes)}
      style={svgStyle}
      ref={ref}
    >
      <path d='M1.106 15.447L12 20.882l10.894-5.435L24 16l-12 6-12-6 1.106-.553zm0-4L12 16.882l10.894-5.435L24 12l-12 6-12-6 1.106-.553zM0 8l12-6 12 6-12 6L0 8zm12 4.882L21.764 8 12 3.118 2.236 8 12 12.882z' />
    </svg>
  )
})

SvgPortfolioFinance24.displayName = 'SvgPortfolioFinance24'
export default withStyles(styles)(SvgPortfolioFinance24)
