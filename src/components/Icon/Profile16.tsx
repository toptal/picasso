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
const SvgProfile16 = forwardRef(function SvgProfile16(
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
          d='M5.639 9.408a5 5 0 1 1 4.723 0A7.003 7.003 0 0 1 15 16h-1a6 6 0 1 0-12 0H1a7.003 7.003 0 0 1 4.639-6.592zM8 9a4 4 0 1 0 0-8 4 4 0 0 0 0 8z'
          id='profile16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='profile16_svg__b'>
          <use xlinkHref='#profile16_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#profile16_svg__a' />
        <g mask='url(#profile16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgProfile16.displayName = 'SvgProfile16'
export default withStyles(styles)(SvgProfile16)
