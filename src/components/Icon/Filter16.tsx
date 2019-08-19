import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}

const SvgFilter16 = (props: Props) => {
  const { classes, className, style = {}, color, scale, base } = props
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
          d='M12 3v1h-1V1h1v1h4v1h-4zM0 2h9v1H0V2zm9 11v1H8v-3h1v1h7v1H9zm-9-1h6v1H0v-1zm4-4H0V7h4V6h1v3H4V8zm12-1v1H7V7h9z'
          id='filter16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='filter16_svg__b'>
          <use xlinkHref='#filter16_svg__a' />
        </mask>
        <use xlinkHref='#filter16_svg__a' />
        <g mask='url(#filter16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgFilter16.displayName = 'SvgFilter16'
export default withStyles(styles)(SvgFilter16)
