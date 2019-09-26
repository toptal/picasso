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
const SvgTerms24 = forwardRef(function SvgTerms24(
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
      viewBox='0 0 24 24'
      className={cx(...classes)}
      style={svgStyle}
      color={svgColor}
      ref={ref}
    >
      <defs>
        <path
          d='M2 0h20v24H2V0zm1 1v22h18V1H3zm3 4h12v1H6V5zm0 3h12v1H6V8zm0 3h7v1H6v-1zm0 7h4v1H6v-1z'
          id='terms24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='terms24_svg__b'>
          <use xlinkHref='#terms24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#terms24_svg__a' />
        <g mask='url(#terms24_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgTerms24.displayName = 'SvgTerms24'
export default withStyles(styles)(SvgTerms24)
