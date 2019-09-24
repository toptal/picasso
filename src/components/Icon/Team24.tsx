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
const SvgTeam24 = forwardRef(function SvgTeam24(
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
          d='M3.95 16L8 7.388V0h8v7.388L20.056 16H24v8h-8v-4H8v4H0v-8h3.95zm1.105 0H8v3h8v-3H18.951l-3.768-8H8.817l-3.762 8zM7 20v-3H1v6h6v-3zm10-1v4h6v-6h-6v2zM9 7h6V1H9v6z'
          id='team24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='team24_svg__b'>
          <use xlinkHref='#team24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#team24_svg__a' />
        <g mask='url(#team24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgTeam24.displayName = 'SvgTeam24'
export default withStyles(styles)(SvgTeam24)
