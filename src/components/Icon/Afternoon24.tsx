import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  size?: number
  scale?: ScaleType
  color?: string
  base?: number
}

const SvgAfternoon24 = (props: Props) => {
  const { classes, className, style = {}, color, scale, size, base } = props

  if (size) {
    const name = 'SvgAfternoon24'

    window.console.warn(
      `${name}: size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`
    )
  }

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
    >
      <defs>
        <path
          d='M11.5 17a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0-1a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zM11 0h1v4h-1V0zm8.278 3.015l.707.707-2.828 2.828-.707-.707 2.828-2.828zM23 11v1h-4v-1h4zm-3.015 8.278l-.707.707-2.828-2.828.707-.707 2.828 2.828zM12 23h-1v-4h1v4zm-8.278-3.015l-.707-.707 2.828-2.828.707.707-2.828 2.828zM0 12v-1h4v1H0zm3.015-8.278l.707-.707L6.55 5.843l-.707.707-2.828-2.828z'
          id='afternoon24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='afternoon24_svg__b'>
          <use xlinkHref='#afternoon24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#afternoon24_svg__a' />
        <g mask='url(#afternoon24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgAfternoon24.displayName = 'SvgAfternoon24'
export default withStyles(styles)(SvgAfternoon24)
