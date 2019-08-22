import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const SvgArrowDownMinor24 = forwardRef(function SvgArrowDownMinor24(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const { classes, className, style = {}, color, scale, base } = props
  const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1)
  const svgStyle = {
    minWidth: `${scaledSize}px`,
    minHeight: `${scaledSize}px`,
    ...style
  }

  return (
    <svg
      viewBox='0 0 24 24'
      className={cx(classes.root, className)}
      style={svgStyle}
      color={color}
      ref={ref}
    >
      <defs>
        <path
          d='M10.793 14.5l-6-6 .707-.707 6 6 6-6 .707.707-6.707 6.707-.707-.707z'
          id='arrowDownMinor24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='arrowDownMinor24_svg__b'>
          <use xlinkHref='#arrowDownMinor24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#arrowDownMinor24_svg__a' />
        <g mask='url(#arrowDownMinor24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgArrowDownMinor24.displayName = 'SvgArrowDownMinor24'
export default withStyles(styles)(SvgArrowDownMinor24)
