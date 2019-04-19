import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
interface Props extends StandardProps {
  width?: number
  height?: number
}

const SvgProfile = (props: Props) => {
  const { classes, className, style, width, height } = props

  return (
    <svg
      {...props}
      viewBox='0 0 24 24'
      className={cx(classes.root, className)}
      style={style}
      height={height}
      width={width}
    >
      <g fillRule='nonzero'>
        <path d='M11.278 13.442a.312.312 0 1 1-.606-.151 3.146 3.146 0 0 1 3.053-2.395h2.033a3.14 3.14 0 0 1 3.026 2.303.313.313 0 0 1-.602.168 2.515 2.515 0 0 0-2.424-1.846h-2.033c-1.16 0-2.164.79-2.447 1.921zM14.683 6.046c-.935 0-1.695.767-1.695 1.712s.76 1.713 1.695 1.713 1.696-.768 1.696-1.713c0-.945-.76-1.712-1.696-1.712zm0-.625a2.33 2.33 0 0 1 2.321 2.337 2.33 2.33 0 0 1-2.32 2.338 2.33 2.33 0 0 1-2.321-2.338 2.33 2.33 0 0 1 2.32-2.337z' />
        <path d='M7.18 3.313v18.925h15.09V3.313H7.18zm-.313-.626h15.716c.173 0 .313.14.313.313v19.55c0 .173-.14.313-.313.313H6.867a.312.312 0 0 1-.313-.313V3c0-.173.14-.313.313-.313zM3.313 20.57h1.054a.312.312 0 1 1 0 .626H3a.312.312 0 0 1-.313-.313V4.667c0-.173.14-.313.313-.313h1.367a.312.312 0 1 1 0 .625H3.313v15.592z' />
        <path d='M10.975 17.104c-.173 0-.313-.168-.313-.375s.14-.375.313-.375h7.5c.173 0 .313.168.313.375s-.14.375-.313.375h-7.5zM10.975 20.438c-.173 0-.313-.168-.313-.375 0-.208.14-.375.313-.375h3.7c.173 0 .313.167.313.375 0 .207-.14.375-.313.375h-3.7z' />
      </g>
    </svg>
  )
}

SvgProfile.displayName = 'SvgProfile'
export default withStyles(styles)(SvgProfile)
