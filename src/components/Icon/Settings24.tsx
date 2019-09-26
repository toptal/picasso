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
const SvgSettings24 = forwardRef(function SvgSettings24(
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
          d='M7.209 19.62l-1.573 1.572-2.828-2.828 1.572-1.573A8.948 8.948 0 0 1 3.223 14H1v-4h2.223A8.948 8.948 0 0 1 4.38 7.209L2.808 5.636l2.828-2.828L7.209 4.38A8.948 8.948 0 0 1 10 3.223V1h4v2.223a8.948 8.948 0 0 1 2.791 1.157l1.573-1.572 2.828 2.828-1.572 1.573c.533.845.929 1.786 1.157 2.791H23v4h-2.223a8.948 8.948 0 0 1-1.157 2.791l1.572 1.573-2.828 2.828-1.573-1.572A8.948 8.948 0 0 1 14 20.777V23h-4v-2.223a8.948 8.948 0 0 1-2.791-1.157zm-.143-1.272l.676.426c.76.48 1.598.828 2.48 1.028l.778.176V22h2v-2.022l.779-.176a7.947 7.947 0 0 0 2.48-1.028l.675-.426 1.43 1.43 1.414-1.414-1.43-1.43.426-.676a7.947 7.947 0 0 0 1.028-2.48l.176-.778H22v-2h-2.022l-.176-.779a7.947 7.947 0 0 0-1.028-2.48l-.426-.675 1.43-1.43-1.414-1.414-1.43 1.43-.676-.426a7.947 7.947 0 0 0-2.48-1.028L13 4.022V2h-2v2.022l-.779.176c-.881.2-1.718.549-2.48 1.028l-.675.426-1.43-1.43-1.414 1.414 1.43 1.43-.426.676a7.947 7.947 0 0 0-1.028 2.48L4.022 11H2v2h2.022l.176.779c.2.881.549 1.718 1.028 2.48l.426.675-1.43 1.43 1.414 1.414 1.43-1.43zM12 17a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-1a4 4 0 1 0 0-8 4 4 0 0 0 0 8z'
          id='settings24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='settings24_svg__b'>
          <use xlinkHref='#settings24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#settings24_svg__a' />
        <g mask='url(#settings24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgSettings24.displayName = 'SvgSettings24'
export default withStyles(styles)(SvgSettings24)
