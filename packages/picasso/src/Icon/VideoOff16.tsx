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
const SvgVideoOff16 = forwardRef(function SvgVideoOff16(
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
      <path d='M12.869 5.252L16 4v8l-4-1.6V13H5.121l1-1H11V7.121l1.869-1.869zM.879 13H0V3h10.879l-1 1H1v8h.879l-1 1zM12 6.677v2.646l3 1.2V5.477l-3 1.2zm-10.5 8.53L.793 14.5 14.5.793l.707.707L1.5 15.207z' />
    </svg>
  )
})

SvgVideoOff16.displayName = 'SvgVideoOff16'
export default withStyles(styles)(SvgVideoOff16)
