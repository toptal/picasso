import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import { StandardProps, ColorType } from '../Picasso'
import styles from './styles'
const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: ColorType | string
  base?: number
}
const SvgLogoEmblem = forwardRef(function SvgLogoEmblem(
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
      viewBox='0 0 35 40'
      className={cx(...classes)}
      style={svgStyle}
      color={svgColor}
      ref={ref}
    >
      <path d='M7.398 23.727l9.923-10.04 2.044 2.068L9.44 25.793l-2.042-2.066zm19.585-7.045L10.493.004 7.158 3.377l6.183 6.254L0 23.125l16.489 16.679 3.334-3.373-6.182-6.258 13.342-13.49zm7.64-12.564V0h-.828l-1.232 2.995L31.33 0h-.828v4.118h.54V.71l1.444 3.407h.154L34.084.71v3.407h.539zM29.884.487V0H27v.487h1.176v3.63h.532V.488h1.176z' />
    </svg>
  )
})

SvgLogoEmblem.displayName = 'SvgLogoEmblem'
export default withStyles(styles)(SvgLogoEmblem)
