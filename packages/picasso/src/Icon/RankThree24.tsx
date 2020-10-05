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
const SvgRankThree24 = forwardRef(function SvgRankThree24(
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
      <path d='M12 13.86l8.203 6.562-.625.78L12 15.14l-7.578 6.063-.625-.781L12 13.86zm0-6l8.203 6.562-.625.78L12 9.14l-7.578 6.063-.625-.781L12 7.86zm0-6l8.203 6.562-.625.78L12 3.14 4.422 9.203l-.625-.781L12 1.86z' />
    </svg>
  )
})

SvgRankThree24.displayName = 'SvgRankThree24'
export default withStyles(styles)(SvgRankThree24)
