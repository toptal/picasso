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
const SvgPencil16 = forwardRef(function SvgPencil16(
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
          d='M9.5 4.207l-8.5 8.5V15h2.293l8.5-8.5L9.5 4.207zm.707-.707L12.5 5.793 13.793 4.5 11.5 2.207 10.207 3.5zM0 12.293L11.5.793 15.207 4.5 3.707 16H0v-3.707z'
          id='pencil16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='pencil16_svg__b'>
          <use xlinkHref='#pencil16_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#pencil16_svg__a' />
        <g mask='url(#pencil16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgPencil16.displayName = 'SvgPencil16'
export default withStyles(styles)(SvgPencil16)
