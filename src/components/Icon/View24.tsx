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

const SvgView24 = (props: Props) => {
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
    const name = 'SvgView24'

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
          d='M2 23H1V1h9v1H2v20h20v-8h1v9H2zM22 2.707l-9.5 9.5-.707-.707 9.5-9.5H15V1h8v8h-1V2.707z'
          id='view24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='view24_svg__b'>
          <use xlinkHref='#view24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#view24_svg__a' />
        <g mask='url(#view24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgView24.displayName = 'SvgView24'
export default withStyles(styles)(SvgView24)
