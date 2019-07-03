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

const SvgAch16 = (props: Props) => {
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
    const name = 'SvgAch16'

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
      data-qa={elementSelector}
    >
      <defs>
        <path
          d='M12 7V6h2.5A1.5 1.5 0 0 1 16 7.5v6a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-6A1.5 1.5 0 0 1 1.5 6H3v1H1.5a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-6a.5.5 0 0 0-.5-.5H12zm-3 3h5v1H9v-1zm-2 2h7v1H7v-1zm1.5-7.793L3 9.707V11h1.293l5.5-5.5L8.5 4.207zm.707-.707L10.5 4.793 11.793 3.5 10.5 2.207 9.207 3.5zM2 9.293l8.5-8.5L13.207 3.5l-8.5 8.5H2V9.293z'
          id='ach16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='ach16_svg__b'>
          <use xlinkHref='#ach16_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#ach16_svg__a' />
        <g mask='url(#ach16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgAch16.displayName = 'SvgAch16'
export default withStyles(styles)(SvgAch16)
