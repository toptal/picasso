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

const SvgTwitter16 = (props: Props) => {
  const { classes, className, style = {}, color, scale, size, base } = props

  if (size) {
    const name = 'SvgTwitter16'

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
          d='M15.969 2.548c-.59.26-1.22.436-1.884.517a3.304 3.304 0 0 0 1.442-1.815c-.634.37-1.336.639-2.084.789a3.28 3.28 0 0 0-5.59 2.987 9.29 9.29 0 0 1-6.76-3.416A3.213 3.213 0 0 0 .65 3.26c0 1.139.58 2.14 1.459 2.729a3.27 3.27 0 0 1-1.485-.41v.04a3.281 3.281 0 0 0 2.63 3.217 3.332 3.332 0 0 1-1.474.057 3.29 3.29 0 0 0 3.069 2.277A6.58 6.58 0 0 1 .78 12.573c-.26 0-.52-.016-.78-.045A9.332 9.332 0 0 0 5.038 14c6.036 0 9.332-4.996 9.332-9.32 0-.14 0-.28-.01-.42C15 3.8 15.56 3.22 16 2.56l-.031-.013z'
          id='twitter16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='twitter16_svg__b'>
          <use xlinkHref='#twitter16_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#twitter16_svg__a' />
        <g mask='url(#twitter16_svg__b)'>
          <path d='M0 0h15.515v17.066H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgTwitter16.displayName = 'SvgTwitter16'
export default withStyles(styles)(SvgTwitter16)
