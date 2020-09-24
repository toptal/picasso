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
const SvgLink16 = forwardRef(function SvgLink16(
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
      <path d='M3 10a3 3 0 01-3-3V6a3 3 0 013-3h5a3 3 0 013 3h2a3 3 0 013 3v1a3 3 0 01-3 3H8a3 3 0 01-3-3H3zm10-3h-2a3 3 0 01-3 3H6a2 2 0 002 2h5a2 2 0 002-2V9a2 2 0 00-2-2zM8 4H3a2 2 0 00-2 2v1a2 2 0 002 2h2a3 3 0 013-3h2a2 2 0 00-2-2zm2 3H8a2 2 0 00-2 2h2a2 2 0 002-2z' />
    </svg>
  )
})

SvgLink16.displayName = 'SvgLink16'
export default withStyles(styles)(SvgLink16)
