import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { StandardProps } from '@toptal/picasso-shared'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType;
  color?: string;
  base?: number;
}
const SvgEye24 = forwardRef(function SvgEye24(
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
      <path d='M12 4c4.418 0 8.418 2.667 12 8-3.582 5.333-7.582 8-12 8s-8.418-2.667-12-8c3.582-5.333 7.582-8 12-8zm0 1C8.155 5 4.605 7.241 1.332 11.833L1.214 12l.118.167c3.19 4.474 6.641 6.717 10.373 6.829L12 19c3.845 0 7.395-2.241 10.668-6.833l.117-.167-.117-.167c-3.19-4.474-6.641-6.717-10.373-6.829L12 5zm0 2a5 5 0 110 10 5 5 0 010-10zm0 1a4 4 0 100 8 4 4 0 000-8z' />
    </svg>
  )
})

SvgEye24.displayName = 'SvgEye24'
export default withStyles(styles)(SvgEye24)
