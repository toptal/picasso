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
const SvgChevronMinor16 = forwardRef(function SvgChevronMinor16(
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
          d='M5.997 3.29l4 4 .707.707-.707.707-4 4-.707-.707 4-4-4-4 .707-.707z'
          id='chevronMinor16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='chevronMinor16_svg__b'>
          <use xlinkHref='#chevronMinor16_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#chevronMinor16_svg__a' />
        <g mask='url(#chevronMinor16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgChevronMinor16.displayName = 'SvgChevronMinor16'
export default withStyles(styles)(SvgChevronMinor16)
