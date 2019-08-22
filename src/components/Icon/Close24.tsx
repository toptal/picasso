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
const SvgClose24 = forwardRef(function SvgClose24(
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
          d='M12.707 12l8.5 8.5-.707.707-8.5-8.5-8.5 8.5-.707-.707 8.5-8.5-8.5-8.5.707-.707 8.5 8.5 8.5-8.5.707.707-8.5 8.5z'
          id='close24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='close24_svg__b'>
          <use xlinkHref='#close24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#close24_svg__a' />
        <g mask='url(#close24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgClose24.displayName = 'SvgClose24'
export default withStyles(styles)(SvgClose24)
