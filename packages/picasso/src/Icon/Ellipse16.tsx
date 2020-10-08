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
const SvgEllipse16 = forwardRef(function SvgEllipse16(
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
      <path d='M12 7c.562 0 1 .423 1 1a.97.97 0 01-1 1 .99.99 0 01-1-1c0-.544.438-1 1-1zM8 7c.562 0 1 .423 1 1a.97.97 0 01-1 1 .99.99 0 01-1-1c0-.544.438-1 1-1zM4 7c.562 0 1 .423 1 1a.97.97 0 01-1 1 .99.99 0 01-1-1c0-.544.438-1 1-1z' />
    </svg>
  )
})

SvgEllipse16.displayName = 'SvgEllipse16'
export default withStyles(styles)(SvgEllipse16)
