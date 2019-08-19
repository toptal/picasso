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

const SvgCopy24 = (props: Props) => {
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
          d='M19 2H2v17H1V1h18v1zM5 5h18v18H5V5zm1 1v16h16V6H6z'
          id='copy24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='copy24_svg__b'>
          <use xlinkHref='#copy24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#copy24_svg__a' />
        <g mask='url(#copy24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgCopy24.displayName = 'SvgCopy24'
export default withStyles(styles)(SvgCopy24)
