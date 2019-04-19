import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
interface Props extends StandardProps {
  width?: number
  height?: number
}

const SvgMessage = (props: Props) => {
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
        <path d='M4.27 16.34a.25.25 0 0 1-.25-.25V4.31a.25.25 0 0 1 .25-.25h15.42a.25.25 0 0 1 .25.25v15.5a.25.25 0 0 1-.397.203L14.47 16.34H4.27zM19.44 4.56H4.52v11.28h10.03l.147.047 4.743 3.433V4.56z' />
        <path d='M7.27 9.44h9.42a.25.25 0 1 0 0-.5H7.27a.25.25 0 1 0 0 .5zM7.27 11.44h4.71a.25.25 0 1 0 0-.5H7.27a.25.25 0 1 0 0 .5z' />
      </g>
    </svg>
  )
}

SvgMessage.displayName = 'SvgMessage'
export default withStyles(styles)(SvgMessage)
