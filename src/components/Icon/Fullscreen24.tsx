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
const SvgFullscreen24 = forwardRef(function SvgFullscreen24(
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
          d='M3 18h4v1H2v-5h1v4zM22 6v4h-1V6h-4V5h5v1zM0 3h24v18H0V3zm1 1v16h22V4H1z'
          id='fullscreen24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='fullscreen24_svg__b'>
          <use xlinkHref='#fullscreen24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#fullscreen24_svg__a' />
        <g mask='url(#fullscreen24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgFullscreen24.displayName = 'SvgFullscreen24'
export default withStyles(styles)(SvgFullscreen24)
