import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { StandardProps } from '@toptal/picasso-shared'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType;
  color?: string;
  base?: number;
}
const SvgCertificate24 = forwardRef(function SvgCertificate24(
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
      <path d='M15 17.4v4.166l2.5-1.667 2.5 1.667V17.4c-.75.384-1.6.6-2.5.6-.9 0-1.75-.216-2.5-.6zm-1-.657a5.5 5.5 0 117 0v6.691l-3.5-2.333-3.5 2.333v-6.691zM2 23H1V1h17v5h-1V2H2v20h11v1H2zm15.5-6a4.5 4.5 0 100-9 4.5 4.5 0 000 9z' />
    </svg>
  )
})

SvgCertificate24.displayName = 'SvgCertificate24'
export default withStyles(styles)(SvgCertificate24)
