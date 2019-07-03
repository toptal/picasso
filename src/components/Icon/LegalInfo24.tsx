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

const SvgLegalInfo24 = (props: Props) => {
  const {
    classes,
    className,
    style = {},
    color,
    scale,
    size,
    base,
    elementSelector
  } = props

  if (size) {
    const name = 'SvgLegalInfo24'

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
      data-qa={elementSelector}
    >
      <defs>
        <path
          d='M16 0l6 6v18H2V0h14zm-.414 1H3v22h18V6.414L15.586 1zM13 17h3v1H9v-1h3v-7H9V9h4v8zM11 7h2v1h-2V7z'
          id='legalInfo24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='legalInfo24_svg__b'>
          <use xlinkHref='#legalInfo24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#legalInfo24_svg__a' />
        <g mask='url(#legalInfo24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgLegalInfo24.displayName = 'SvgLegalInfo24'
export default withStyles(styles)(SvgLegalInfo24)
