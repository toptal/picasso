import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
interface Props extends StandardProps {
  size?: number
  color?: string
}

const SvgTrash = (props: Props) => {
  const { classes, className, style, size, color } = props
  const svgStyle = {
    fontSize: size && `${size}rem`,
    ...style
  }

  return (
    <svg
      {...props}
      viewBox='0 0 24 24'
      className={cx(classes.root, className)}
      style={svgStyle}
      color={color}
    >
      <g fillRule='nonzero'>
        <path d='M9.6 5.3h3.888a.3.3 0 0 0 0-.6H9.6a.3.3 0 0 0 0 .6zM10.392 15.453V10.25a.3.3 0 0 0-.6 0v5.203a.3.3 0 1 0 .6 0zM13.296 15.453V10.25a.3.3 0 0 0-.6 0v5.203a.3.3 0 1 0 .6 0zM6 7.633h11.088a.3.3 0 0 0 0-.6H6a.3.3 0 0 0 0 .6z' />
        <path d='M15.588 18.07H7.5V7.333a.3.3 0 0 0-.6 0V18.37a.3.3 0 0 0 .3.3h8.688a.3.3 0 0 0 .3-.3V7.333a.3.3 0 0 0-.6 0V18.07z' />
      </g>
    </svg>
  )
}

SvgTrash.displayName = 'SvgTrash'
export default withStyles(styles)(SvgTrash)
