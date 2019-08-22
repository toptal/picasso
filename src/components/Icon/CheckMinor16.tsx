import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const SvgCheckMinor16 = forwardRef(function SvgCheckMinor16(
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
      viewBox='0 0 16 16'
      className={cx(classes.root, className)}
      style={svgStyle}
      color={color}
      ref={ref}
    >
      <defs>
        <path
          d='M6.5 9.793l4-4 .707.707-4 4-.707.707L3.793 8.5l.707-.707 2 2z'
          id='checkMinor16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='checkMinor16_svg__b'>
          <use xlinkHref='#checkMinor16_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#checkMinor16_svg__a' />
        <g mask='url(#checkMinor16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgCheckMinor16.displayName = 'SvgCheckMinor16'
export default withStyles(styles)(SvgCheckMinor16)
