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
const SvgArrowLongDown24 = forwardRef(function SvgArrowLongDown24(
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
          d='M12 3v16.291l4.5-4.498.707.707-5.707 5.707L5.793 15.5l.707-.707 4.5 4.499V3h1z'
          id='arrowLongDown24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='arrowLongDown24_svg__b'>
          <use xlinkHref='#arrowLongDown24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#arrowLongDown24_svg__a' />
        <g mask='url(#arrowLongDown24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgArrowLongDown24.displayName = 'SvgArrowLongDown24'
export default withStyles(styles)(SvgArrowLongDown24)
