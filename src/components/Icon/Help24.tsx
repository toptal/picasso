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
const SvgHelp24 = forwardRef(function SvgHelp24(
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
          d='M12 23C5.925 23 1 18.075 1 12S5.925 1 12 1s11 4.925 11 11-4.925 11-11 11zm0-1c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-8v3h-1v-4h1a3 3 0 1 0-3-3H8a4 4 0 1 1 4 4zm-1 4h1v1h-1v-1z'
          id='help24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='help24_svg__b'>
          <use xlinkHref='#help24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#help24_svg__a' />
        <g mask='url(#help24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgHelp24.displayName = 'SvgHelp24'
export default withStyles(styles)(SvgHelp24)
