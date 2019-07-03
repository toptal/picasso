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

const SvgCertificate16 = (props: Props) => {
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
    const name = 'SvgCertificate16'

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
      data-qa={elementSelector}
    >
      <defs>
        <path
          d='M14 10.663a3.486 3.486 0 0 1-1.5.337c-.537 0-1.045-.12-1.5-.337v3.165l1.5-.45 1.5.45v-3.165zm1-.714v5.223l-2.5-.75-2.5.75V9.949a3.5 3.5 0 1 1 5 0zM1 16H0V0h13v3h-1V1H1v14h8v1H1zm11.5-6a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z'
          id='certificate16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='certificate16_svg__b'>
          <use xlinkHref='#certificate16_svg__a' />
        </mask>
        <use xlinkHref='#certificate16_svg__a' />
        <g mask='url(#certificate16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgCertificate16.displayName = 'SvgCertificate16'
export default withStyles(styles)(SvgCertificate16)
