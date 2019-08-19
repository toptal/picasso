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

const SvgChat24 = (props: Props) => {
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
          d='M11 16h1v1h7v2.586L21.586 17H23V9h-4V8h5v10h-2l-4 4v-4h-7v-2zM0 2h18v13H7v4l-4-4H0V2zm1 1v11h2.414L6 16.586V14h11V3H1z'
          id='chat24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='chat24_svg__b'>
          <use xlinkHref='#chat24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#chat24_svg__a' />
        <g mask='url(#chat24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgChat24.displayName = 'SvgChat24'
export default withStyles(styles)(SvgChat24)
