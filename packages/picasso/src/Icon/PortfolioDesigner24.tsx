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
const SvgPortfolioDesigner24 = forwardRef(function SvgPortfolioDesigner24(
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
      <path d='M1 1h9v9H1V1zm1 1v7h7V2H2zm12-1h9v9h-9V1zm1 1v7h7V2h-7zM1 14h9v9H1v-9zm1 8h7v-7H2v7zm12-8h9v9h-9v-9zm1 8h7v-7h-7v7z' />
    </svg>
  )
})

SvgPortfolioDesigner24.displayName = 'SvgPortfolioDesigner24'
export default withStyles(styles)(SvgPortfolioDesigner24)
