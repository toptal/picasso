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
const SvgCode24 = forwardRef(function SvgCode24(
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
          d='M1.655 12l5.054 6.067-.769.64L.354 12 5.94 5.295l.769.64L1.655 12zm20.699 0L17.3 5.936l.768-.64L23.655 12l-5.586 6.707-.769-.64L22.354 12zM9.87 23.102l-.973-.231L14.129.898l.973.231-5.231 21.973z'
          id='code24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='code24_svg__b'>
          <use xlinkHref='#code24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#code24_svg__a' />
        <g mask='url(#code24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgCode24.displayName = 'SvgCode24'
export default withStyles(styles)(SvgCode24)
