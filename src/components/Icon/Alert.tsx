import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
interface Props extends StandardProps {
  size?: number
  color?: string
}

const SvgAlert = (props: Props) => {
  const { classes, className, style, size, color } = props
  const svgStyle = {
    fontSize: size && `${size}rem`,
    ...style
  }

  return (
    <svg
      viewBox='0 0 16 16'
      className={cx(classes.root, className)}
      style={svgStyle}
      color={color}
    >
      <path d='M7.986 2.618a1 1 0 0 0-.984 1.014v5.832a1 1 0 1 0 2 0V3.632a1 1 0 0 0-1.016-1.014zm.012 8.346a1 1 0 0 0-.748.322c-.037.03-.094.022-.127.057a1.202 1.202 0 0 0-.326.87 1.226 1.226 0 0 0 1.205 1.169 1 1 0 0 0 .023 0c.323-.007.63-.142.852-.377a1.21 1.21 0 0 0 .326-.87c-.012-.359-.208-.647-.475-.863a1 1 0 0 0-.69-.306 1 1 0 0 0-.036-.002z' />
    </svg>
  )
}

SvgAlert.displayName = 'SvgAlert'
export default withStyles(styles)(SvgAlert)
