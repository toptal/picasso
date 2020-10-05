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
const SvgOwnerDefault24 = forwardRef(function SvgOwnerDefault24(
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
      <path d='M13 9a4 4 0 014 4h3a4 4 0 014 4v2a4 4 0 01-4 4h-9a4 4 0 01-4-4H4a4 4 0 01-4-4v-2a4 4 0 014-4h9zm7 5h-3v1a4 4 0 01-4 4H8a3 3 0 003 3h9a3 3 0 003-3v-2a3 3 0 00-3-3zm-7-4H4a3 3 0 00-3 3v2a3 3 0 003 3h3v-1a4 4 0 014-4h5a3 3 0 00-3-3zm3 4h-5a3 3 0 00-3 3v1h5a3 3 0 003-3v-1zm5-13v3h3v1h-3v3h-1V5h-3V4h3V1h1z' />
    </svg>
  )
})

SvgOwnerDefault24.displayName = 'SvgOwnerDefault24'
export default withStyles(styles)(SvgOwnerDefault24)
