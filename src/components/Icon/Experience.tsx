import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
interface Props extends StandardProps {
  size?: number
  color?: string
}

const SvgExperience = (props: Props) => {
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
        <path d='M9.056 21.226h12.746a.25.25 0 1 0 0-.5H9.056a.25.25 0 1 0 0 .5zM8.806 11.736a.25.25 0 0 1 .25-.25h12.746a.25.25 0 0 1 .25.25v6.472a.25.25 0 0 1-.25.25H9.056a.25.25 0 0 1-.25-.25v-6.472zm.5.25v5.972h12.246v-5.972H9.306zM17.464 9.086h-4.07a.25.25 0 1 0 0 .5h4.07a.25.25 0 1 0 0-.5zM15.694 4.066v2.87a.25.25 0 1 0 .5 0v-3.12a.25.25 0 0 0-.25-.25h-5.186a.25.25 0 0 0 0 .5h4.936zM3.448 12.814V4.066h4.935a.25.25 0 1 0 0-.5H3.198a.25.25 0 0 0-.25.25v9.248c0 .138.112.25.25.25H6.68a.25.25 0 1 0 0-.5H3.448z' />
        <path d='M8.133 2.216a.25.25 0 0 1 .25-.25h2.375a.25.25 0 0 1 .25.25v3.2a.25.25 0 0 1-.25.25H8.383a.25.25 0 0 1-.25-.25v-3.2zm.5 2.95h1.875v-2.7H8.633v2.7z' />
      </g>
    </svg>
  )
}

SvgExperience.displayName = 'SvgExperience'
export default withStyles(styles)(SvgExperience)
