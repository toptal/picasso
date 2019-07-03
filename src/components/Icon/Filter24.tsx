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

const SvgFilter24 = (props: Props) => {
  const {
    classes,
    className,
    style = {},
    color,
    scale,
    size,
    base,
    elementSelector
  } = props

  if (size) {
    const name = 'SvgFilter24'

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
      data-qa={elementSelector}
    >
      <defs>
        <path
          d='M17 6v2h-1V3h1v2h7v1h-7zM0 5h14v1H0V5zm13 13v2h-1v-5h1v2h11v1H13zM0 17h10v1H0v-1zm7-5H0v-1h7V9h1v5H7v-2zm17-1v1H10v-1h14z'
          id='filter24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='filter24_svg__b'>
          <use xlinkHref='#filter24_svg__a' />
        </mask>
        <use xlinkHref='#filter24_svg__a' />
        <g mask='url(#filter24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgFilter24.displayName = 'SvgFilter24'
export default withStyles(styles)(SvgFilter24)
