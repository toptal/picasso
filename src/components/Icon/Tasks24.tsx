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

const SvgTasks24 = (props: Props) => {
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
    const name = 'SvgTasks24'

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
          d='M5.5 5.793l5-5 .707.707-5 5-.707.707L2.793 4.5l.707-.707 2 2zM5 1v1H1v7h7V7h1v3H0V1h5zM0 13h9v9H0v-9zm1 1v7h7v-7H1zm11-9h12v1H12V5zm0 12h12v1H12v-1z'
          id='tasks24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='tasks24_svg__b'>
          <use xlinkHref='#tasks24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#tasks24_svg__a' />
        <g mask='url(#tasks24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgTasks24.displayName = 'SvgTasks24'
export default withStyles(styles)(SvgTasks24)
