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
const SvgReferrals24 = forwardRef(function SvgReferrals24(
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
          d='M21.5 10.793l.707.707-9.707 9.707-.707-.707 9-9-9-9 .707-.707 9 9zm-10 0l.707.707L2.5 21.207l-.707-.707 9-9-9-9 .707-.707 9 9z'
          id='referrals24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='referrals24_svg__b'>
          <use xlinkHref='#referrals24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#referrals24_svg__a' />
        <g mask='url(#referrals24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgReferrals24.displayName = 'SvgReferrals24'
export default withStyles(styles)(SvgReferrals24)
