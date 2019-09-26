import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import { StandardProps, ColorType } from '../Picasso'
import styles from './styles'
const BASE_SIZE = 32

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: ColorType | string
  base?: number
}
const SvgCreditCard32 = forwardRef(function SvgCreditCard32(
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
          d='M31 10V7a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v3h30zm0 1H1v14a1 1 0 0 0 1 1h28a1 1 0 0 0 1-1V11zM2 5h28a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm2 11h10v1H4v-1zm0 4h5v1H4v-1zm19-4h5v1h-5v-1z'
          id='creditCard32_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='creditCard32_svg__b'>
          <use xlinkHref='#creditCard32_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#creditCard32_svg__a' />
        <g mask='url(#creditCard32_svg__b)'>
          <path d='M0 0h32v32H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgCreditCard32.displayName = 'SvgCreditCard32'
export default withStyles(styles)(SvgCreditCard32)
