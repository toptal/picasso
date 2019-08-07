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

const SvgArrowDropDown24 = (props: Props) => {
  const { classes, className, style = {}, color, scale, size, base } = props

  if (size) {
    const name = 'SvgArrowDropDown24'

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
          d='M11.372 7.785c.347-.434.913-.43 1.256 0l6.744 8.43c.347.434.183.785-.373.785H5.001c-.553 0-.716-.356-.373-.785l6.744-8.43z'
          id='arrowDropDown24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='arrowDropDown24_svg__b'>
          <use xlinkHref='#arrowDropDown24_svg__a' />
        </mask>
        <use
          transform='matrix(1 0 0 -1 0 24)'
          xlinkHref='#arrowDropDown24_svg__a'
        />
        <g mask='url(#arrowDropDown24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgArrowDropDown24.displayName = 'SvgArrowDropDown24'
export default withStyles(styles)(SvgArrowDropDown24)
