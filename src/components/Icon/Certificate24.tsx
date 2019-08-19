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

const SvgCertificate24 = (props: Props) => {
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
          d='M15 17.4v4.166l2.5-1.667 2.5 1.667V17.4c-.75.384-1.6.6-2.5.6-.9 0-1.75-.216-2.5-.6zm-1-.657a5.5 5.5 0 1 1 7 0v6.691l-3.5-2.333-3.5 2.333v-6.691zM2 23H1V1h17v5h-1V2H2v20h11v1H2zm15.5-6a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9z'
          id='certificate24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='certificate24_svg__b'>
          <use xlinkHref='#certificate24_svg__a' />
        </mask>
        <use xlinkHref='#certificate24_svg__a' />
        <g mask='url(#certificate24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgCertificate24.displayName = 'SvgCertificate24'
export default withStyles(styles)(SvgCertificate24)
