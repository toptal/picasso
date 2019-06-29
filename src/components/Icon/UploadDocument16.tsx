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

const SvgUploadDocument16 = (props: Props) => {
  const { classes, className, style = {}, color, scale, size, base } = props

  if (size) {
    const name = 'SvgUploadDocument16'

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
          d='M1 15h7v1H0V0h13v8h-1V1H1v14zm12-3.293V16h-1v-4.293l-1.5 1.5-.707-.707L12.5 9.793l.707.707 2 2-.707.707-1.5-1.5zM3 4h7v1H3V4zm0 2h7v1H3V6zm0 2h3v1H3V8z'
          id='uploadDocument16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='uploadDocument16_svg__b'>
          <use xlinkHref='#uploadDocument16_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#uploadDocument16_svg__a' />
        <g mask='url(#uploadDocument16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgUploadDocument16.displayName = 'SvgUploadDocument16'
export default withStyles(styles)(SvgUploadDocument16)
