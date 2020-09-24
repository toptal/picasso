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
const SvgParticipants16 = forwardRef(function SvgParticipants16(
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
      <path d='M10.875 10.4a2.5 2.5 0 113.25 0A3.5 3.5 0 0116 13.5v.5h-1v-.5a2.5 2.5 0 00-4.268-1.768l-.707-.707c.252-.252.539-.462.85-.625zm-7.922-.963a4 4 0 114.095 0A5.001 5.001 0 0110 14H9a4 4 0 10-8 0H0a5.001 5.001 0 012.953-4.563zM5 9a3 3 0 100-6 3 3 0 000 6zm7.5 1a1.5 1.5 0 100-3 1.5 1.5 0 000 3z' />
    </svg>
  )
})

SvgParticipants16.displayName = 'SvgParticipants16'
export default withStyles(styles)(SvgParticipants16)
