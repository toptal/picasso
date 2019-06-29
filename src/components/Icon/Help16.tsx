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
  base?: number
}

const SvgHelp16 = (props: Props) => {
  const { classes, className, style = {}, color, scale, size, base } = props

  if (size) {
    const name = 'SvgHelp16'

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
      viewBox='0 0 16 16'
      className={cx(classes.root, className)}
      style={svgStyle}
      color={color}
    >
      <defs>
        <path
          d='M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zm0-1A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0-6v2H7V8h1a2 2 0 1 0-2-2H5a3 3 0 1 1 3 3zm-1 3h1v1H7v-1z'
          id='help16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='help16_svg__b'>
          <use xlinkHref='#help16_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#help16_svg__a' />
        <g mask='url(#help16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgHelp16.displayName = 'SvgHelp16'
export default withStyles(styles)(SvgHelp16)
