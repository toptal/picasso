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
const SvgGlobe16 = forwardRef(function SvgGlobe16(
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
      viewBox='0 0 16 16'
      className={cx(...classes)}
      style={svgStyle}
      color={svgColor}
      ref={ref}
    >
      <defs>
        <path
          d='M1.019 8a6.505 6.505 0 0 0 4.508 5.695C4.665 12.432 4.08 10.366 4.007 8H1.02zm0-1h2.989c.072-2.366.657-4.432 1.519-5.695A6.505 6.505 0 0 0 1.019 7zM13.98 7a6.505 6.505 0 0 0-4.508-5.695c.862 1.263 1.447 3.329 1.52 5.695h2.988zm0 1h-2.989c-.072 2.366-.657 4.432-1.519 5.695A6.505 6.505 0 0 0 13.981 8zM5.008 8c.114 3.412 1.373 6 2.492 6s2.378-2.588 2.492-6H5.008zm0-1h4.984C9.878 3.588 8.619 1 7.5 1S5.122 3.588 5.008 7zM7.5 15a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z'
          id='globe16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='globe16_svg__b'>
          <use xlinkHref='#globe16_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#globe16_svg__a' />
        <g mask='url(#globe16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgGlobe16.displayName = 'SvgGlobe16'
export default withStyles(styles)(SvgGlobe16)
