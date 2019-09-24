import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import { StandardProps, ColorType } from '../Picasso'
import styles from './styles'
const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: ColorType | string
  base?: number
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
  let svgColor
  const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1)
  const colorClassName = kebabToCamelCase(`${color}`)

  if (!availableClasses[`${colorClassName}`]) {
    svgColor = color
  } else {
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
      color={svgColor}
      ref={ref}
    >
      <defs>
        <path
          d='M2 26h28v4H2v-4zm1 1v2h26v-2H3zM2 8l14-6 14 6v3H2V8zm1 .66V10h26V8.66L16 3.087 3 8.659zM4 12h6v13H4V12zm1 1v11h4V13H5zm8-1h6v13h-6V12zm1 1v11h4V13h-4zm8-1h6v13h-6V12zm1 1v11h4V13h-4z'
          id='bankWire24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='bankWire24_svg__b'>
          <use xlinkHref='#bankWire24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#bankWire24_svg__a' />
        <g mask='url(#bankWire24_svg__b)'>
          <path d='M0 0h32v32H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgBankWire24.displayName = 'SvgBankWire24'
export default withStyles(styles)(SvgBankWire24)
