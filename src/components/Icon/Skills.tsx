import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
interface Props extends StandardProps {
  size?: number
  color?: string
}

const SvgSkills = (props: Props) => {
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
        <path d='M18.948 22.4l-4.81-4.802a.25.25 0 1 0-.353.354l4.987 4.977a.25.25 0 0 0 .353 0l3.804-3.804a.25.25 0 0 0 0-.353l-4.977-4.987a.25.25 0 1 0-.354.353l4.801 4.81-3.45 3.451zM1.6 5.052L5.053 1.6l4.81 4.8a.25.25 0 0 0 .353-.353L5.228 1.071a.25.25 0 0 0-.353 0L1.07 4.875a.25.25 0 0 0 0 .353l4.977 4.987a.25.25 0 0 0 .354-.353L1.6 5.052z' />
        <path d='M4.367 8.18l1.906-1.907a.25.25 0 0 0-.353-.353L4.013 7.827a.25.25 0 0 0 .354.353zM6.402 10.215l.953-.953a.25.25 0 0 0-.353-.354l-.954.954a.25.25 0 0 0 .354.353zM16.173 19.978l1.907-1.897a.25.25 0 1 0-.353-.355l-1.907 1.898a.25.25 0 1 0 .353.354zM14.138 17.952l.954-.954a.25.25 0 1 0-.354-.353l-.953.953a.25.25 0 1 0 .353.354zM2.83 17.115v3.804c0 .138.113.25.25.25h3.805l.177-.073L21.096 7.062a.25.25 0 0 0 0-.354l-3.804-3.804a.25.25 0 0 0-.354 0L2.904 16.938l-.073.177zm14.285-13.68l3.45 3.45L6.782 20.669h-3.45v-3.45L17.115 3.434z' />
        <path d='M5.155 19.19l12.2-12.202a.25.25 0 0 0-.353-.353l-12.2 12.2a.25.25 0 0 0 .353.354z' />
      </g>
    </svg>
  )
}

SvgSkills.displayName = 'SvgSkills'
export default withStyles(styles)(SvgSkills)
