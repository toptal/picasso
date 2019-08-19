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

const SvgVideoOn16 = (props: Props) => {
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
          d='M12 5.6L16 4v8l-4-1.6V13H0V3h12v2.6zm0 1.077v2.646l3 1.2V5.477l-3 1.2zM11 6V4H1v8h10V6z'
          id='videoOn16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='videoOn16_svg__b'>
          <use xlinkHref='#videoOn16_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#videoOn16_svg__a' />
        <g mask='url(#videoOn16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgVideoOn16.displayName = 'SvgVideoOn16'
export default withStyles(styles)(SvgVideoOn16)
