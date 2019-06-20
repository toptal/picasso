import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  size?: number
  scale?: ScaleType
  color?: string
}

const SvgReferral16 = (props: Props) => {
  const { classes, className, style = {}, color, scale, size } = props

  if (size) {
    window.console.warn(
      `'size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`
    )
  }

  const scaledSize = `${BASE_SIZE * Math.ceil(scale || 1)}px`
  const svgStyle = {
    minWidth: scaledSize,
    minHeight: scaledSize,
    ...style
  }

  return (
    <svg
      viewBox='0 0 16 16'
      className={cx(classes.root, className)}
      style={svgStyle}
      color={color}
    >
      <defs>
        <path
          d='M14.5 6.793l.707.707L8.5 14.207l-.707-.707 6-6-6-6L8.5.793l6 6zm-7 0l.707.707L1.5 14.207.793 13.5l6-6-6-6L1.5.793l6 6z'
          id='referral16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='referral16_svg__b'>
          <use xlinkHref='#referral16_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#referral16_svg__a' />
        <g mask='url(#referral16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgReferral16.displayName = 'SvgReferral16'
export default withStyles(styles)(SvgReferral16)
