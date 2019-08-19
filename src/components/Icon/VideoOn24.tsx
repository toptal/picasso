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

const SvgVideoOn24 = (props: Props) => {
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
          d='M18 8.571L24 6v12l-6-2.571V19H0V5h18v3.571zm0 1.088v4.682l5 2.142V7.517l-5 2.142zM17 9V6H1v12h16V9z'
          id='videoOn24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='videoOn24_svg__b'>
          <use xlinkHref='#videoOn24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#videoOn24_svg__a' />
        <g mask='url(#videoOn24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgVideoOn24.displayName = 'SvgVideoOn24'
export default withStyles(styles)(SvgVideoOn24)
