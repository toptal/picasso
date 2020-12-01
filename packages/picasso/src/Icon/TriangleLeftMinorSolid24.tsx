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
const SvgTriangleLeftMinorSolid24 = forwardRef(
  function SvgTriangleLeftMinorSolid24(props: Props, ref: Ref<SVGSVGElement>) {
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
        <path d='M17 4L7 12l10 8z' />
      </svg>
    )
  }
)

SvgTriangleLeftMinorSolid24.displayName = 'SvgTriangleLeftMinorSolid24'
export default withStyles(styles)(SvgTriangleLeftMinorSolid24)
