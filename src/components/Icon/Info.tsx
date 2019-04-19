import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
interface Props extends StandardProps {
  width?: number
  height?: number
}

const SvgInfo = (props: Props) => {
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
      <path
        d='M24 12c0 6.625-5.375 12-12 12S0 18.625 0 12 5.375 0 12 0s12 5.375 12 12zm-8 7.5V17c0-.281-.219-.5-.5-.5H14v-8c0-.281-.219-.5-.5-.5h-5c-.281 0-.5.219-.5.5V11c0 .281.219.5.5.5H10v5H8.5c-.281 0-.5.219-.5.5v2.5c0 .281.219.5.5.5h7c.281 0 .5-.219.5-.5zm-2-14V3c0-.281-.219-.5-.5-.5h-3c-.281 0-.5.219-.5.5v2.5c0 .281.219.5.5.5h3c.281 0 .5-.219.5-.5z'
        fillRule='evenodd'
      />
    </svg>
  )
}

SvgInfo.displayName = 'SvgInfo'
export default withStyles(styles)(SvgInfo)
