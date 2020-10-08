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
const SvgSpecialGroup24 = forwardRef(function SvgSpecialGroup24(
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
      <path d='M20.103 7.388a4 4 0 10-4.206 0 6.015 6.015 0 00-3.717 4.179.55.55 0 00-.36 0 6.015 6.015 0 00-3.717-4.18 4 4 0 10-4.206 0A6.005 6.005 0 000 13h1a4.996 4.996 0 019.991-.086l-1.15 2.332-3.827.556a.5.5 0 00-.278.853l2.77 2.7-.654 3.81a.5.5 0 00.725.528l3.423-1.8 3.423 1.8a.5.5 0 00.725-.527l-.653-3.812 2.769-2.699a.5.5 0 00-.278-.853l-3.826-.556-1.151-2.332A4.996 4.996 0 0123 13h1a6.005 6.005 0 00-3.897-5.612zM3 4a3 3 0 113 3 3.003 3.003 0 01-3-3zm10.38 11.925a.5.5 0 00.376.273l3.084.448-2.232 2.176a.5.5 0 00-.144.442l.527 3.072-2.759-1.45a.5.5 0 00-.464 0l-2.76 1.45.528-3.072a.5.5 0 00-.144-.442L7.16 16.646l3.084-.448a.5.5 0 00.377-.273L12 13.13zM15 4a3 3 0 113 3 3.003 3.003 0 01-3-3z' />
    </svg>
  )
})

SvgSpecialGroup24.displayName = 'SvgSpecialGroup24'
export default withStyles(styles)(SvgSpecialGroup24)
