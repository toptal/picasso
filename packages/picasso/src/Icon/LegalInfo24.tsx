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
const SvgLegalInfo24 = forwardRef(function SvgLegalInfo24(
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
      <path d='M16 0l6 6v18H2V0h14zm-.414 1H3v22h18V6.414L15.586 1zM13 17h3v1H9v-1h3v-7H9V9h4v8zM11 7h2v1h-2V7z' />
    </svg>
  )
})
SvgLegalInfo24.displayName = 'SvgLegalInfo24'
export default withStyles(styles)(SvgLegalInfo24)
