import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
interface Props extends StandardProps {
  size?: number
  color?: string
}

const SvgMessage = (props: Props) => {
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
      <g fillRule='nonzero'>
        <path d='M.25 12.28a.25.25 0 0 1-.25-.25V.25A.25.25 0 0 1 .25 0h15.42a.25.25 0 0 1 .25.25v15.5a.25.25 0 0 1-.397.203L10.45 12.28H.25zM15.42.5H.5v11.28h10.03l.147.047 4.743 3.433V.5z' />
        <path d='M3.25 5.38h9.42a.25.25 0 1 0 0-.5H3.25a.25.25 0 1 0 0 .5zM3.25 7.38h4.71a.25.25 0 1 0 0-.5H3.25a.25.25 0 1 0 0 .5z' />
      </g>
    </svg>
  )
}

SvgMessage.displayName = 'SvgMessage'
export default withStyles(styles)(SvgMessage)
