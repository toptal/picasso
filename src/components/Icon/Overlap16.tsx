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
const SvgOverlap16 = forwardRef(function SvgOverlap16(
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
          d='M12 2H2v10H1V1h11v1zm2 2h1v11H4v-1h10V4zM4 4h8v8H4V4zm1 1v6h6V5H5z'
          id='overlap16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='overlap16_svg__b'>
          <use xlinkHref='#overlap16_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#overlap16_svg__a' />
        <g mask='url(#overlap16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgOverlap16.displayName = 'SvgOverlap16'
export default withStyles(styles)(SvgOverlap16)
