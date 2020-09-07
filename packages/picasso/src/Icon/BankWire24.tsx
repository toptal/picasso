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
const SvgBankWire24 = forwardRef(function SvgBankWire24(
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
      viewBox='0 0 32 32'
      className={cx(...classes)}
      style={svgStyle}
      ref={ref}
    >
      <path d='M2 26h28v4H2v-4zm1 1v2h26v-2H3zM2 8l14-6 14 6v3H2V8zm1 .66V10h26V8.66L16 3.087 3 8.659zM4 12h6v13H4V12zm1 1v11h4V13H5zm8-1h6v13h-6V12zm1 1v11h4V13h-4zm8-1h6v13h-6V12zm1 1v11h4V13h-4z' />
    </svg>
  )
})

SvgBankWire24.displayName = 'SvgBankWire24'
export default withStyles(styles)(SvgBankWire24)
