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

const SvgResouces24 = (props: Props) => {
  const { classes, className, style = {}, color, scale, size, base } = props

  if (size) {
    const name = 'SvgResouces24'

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
          d='M16 0l6 6v18H2V0h14zm-.414 1H3v22h18V6.414L15.586 1zM12 14v3h-1v-4h1a3 3 0 1 0-3-3H8a4 4 0 1 1 4 4zm-1 4h1v1h-1v-1z'
          id='resouces24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='resouces24_svg__b'>
          <use xlinkHref='#resouces24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#resouces24_svg__a' />
        <g mask='url(#resouces24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgResouces24.displayName = 'SvgResouces24'
export default withStyles(styles)(SvgResouces24)
