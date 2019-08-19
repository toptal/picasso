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

const SvgArrowDropUp16 = (props: Props) => {
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
          d='M7.357 5.772c.355-.426.926-.432 1.286 0l3.714 4.456c.355.426.187.772-.352.772h-8.01c-.55 0-.712-.34-.352-.772l3.714-4.456z'
          id='arrowDropUp16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='arrowDropUp16_svg__b'>
          <use xlinkHref='#arrowDropUp16_svg__a' />
        </mask>
        <use xlinkHref='#arrowDropUp16_svg__a' />
        <g mask='url(#arrowDropUp16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgArrowDropUp16.displayName = 'SvgArrowDropUp16'
export default withStyles(styles)(SvgArrowDropUp16)
