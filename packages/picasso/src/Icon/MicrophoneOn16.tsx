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
const SvgMicrophoneOn16 = forwardRef(function SvgMicrophoneOn16(
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
      <path d='M7 15v-2.022A5.5 5.5 0 012 7.5h1a4.5 4.5 0 009 0h1a5.5 5.5 0 01-5 5.478V15h3v1H4v-1h3zm.5-15A3.5 3.5 0 0111 3.5v4a3.5 3.5 0 01-7 0v-4A3.5 3.5 0 017.5 0zm0 1A2.5 2.5 0 005 3.5v4a2.5 2.5 0 005 0v-4A2.5 2.5 0 007.5 1z' />
    </svg>
  )
})

SvgMicrophoneOn16.displayName = 'SvgMicrophoneOn16'
export default withStyles(styles)(SvgMicrophoneOn16)
