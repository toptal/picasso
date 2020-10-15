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
const SvgMulti24 = forwardRef(function SvgMulti24(
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
      <path d='M6 11l5.196 3v6L6 23 .804 20v-6L6 11zm12 0l5.196 3v6L18 23l-5.196-3v-6L18 11zM6 12.155l-4.197 2.422v4.845L6 21.844l4.196-2.422v-4.845L6 12.155zm12 0l-4.197 2.422v4.845L18 21.844l4.196-2.422v-4.845L18 12.155zM12 0l5.196 3v6L12 12 6.804 9V3L12 0zm0 1.155L7.803 3.577v4.845L12 10.844l4.196-2.422V3.577L12 1.155z' />
    </svg>
  )
})

SvgMulti24.displayName = 'SvgMulti24'
export default withStyles(styles)(SvgMulti24)
