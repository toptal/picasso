import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}

const SvgArrowUpMinor24 = (props: Props) => {
  const { classes, className, style = {}, color, scale, base } = props
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
          d='M12.207 8.5l6 6-.707.707-6-6-6 6-.707-.707L11.5 7.793l.707.707z'
          id='arrowUpMinor24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='arrowUpMinor24_svg__b'>
          <use xlinkHref='#arrowUpMinor24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#arrowUpMinor24_svg__a' />
        <g mask='url(#arrowUpMinor24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgArrowUpMinor24.displayName = 'SvgArrowUpMinor24'
export default withStyles(styles)(SvgArrowUpMinor24)
