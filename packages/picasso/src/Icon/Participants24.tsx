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
const SvgParticipants24 = forwardRef(function SvgParticipants24(
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
      <path d='M16.953 16.437a4 4 0 114.095 0A5.001 5.001 0 0124 21h-1a4 4 0 00-6.222-3.327l-.556-.83c.232-.156.476-.291.73-.406zM5.428 13.422a6 6 0 115.144 0A8.003 8.003 0 0116 21h-1a7 7 0 00-14 0H0a8.003 8.003 0 015.428-7.578zM8 13A5 5 0 108 3a5 5 0 000 10zm11 3a3 3 0 100-6 3 3 0 000 6z' />
    </svg>
  )
})

SvgParticipants24.displayName = 'SvgParticipants24'
export default withStyles(styles)(SvgParticipants24)
