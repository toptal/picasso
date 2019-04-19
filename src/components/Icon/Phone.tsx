import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
interface Props extends StandardProps {
  size?: number
  color?: string
}

const SvgPhone = (props: Props) => {
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
      <path
        d='M10.027 10.415l1.062-1.062a1.02 1.02 0 0 0 0-1.44l-2.99-2.99a1.02 1.02 0 0 0-1.44 0l-1.36 1.36a2.293 2.293 0 0 0-.49 2.521 20.646 20.646 0 0 0 11.09 11.09 2.298 2.298 0 0 0 2.51-.491l1.36-1.36a1.02 1.02 0 0 0 0-1.44l-2.99-2.99a1.02 1.02 0 0 0-1.44 0l-1.066 1.065a16.56 16.56 0 0 1-4.246-4.263zM5.5 8.513a1.543 1.543 0 0 1 .329-1.7l1.36-1.36a.27.27 0 0 1 .38 0l2.99 2.99a.27.27 0 0 1 0 .38l-1.28 1.28a.375.375 0 0 0-.049.47 17.304 17.304 0 0 0 4.866 4.887l.06.033a.375.375 0 0 0 .433-.07l1.28-1.28a.27.27 0 0 1 .38 0l2.99 2.99a.27.27 0 0 1 0 .38l-1.36 1.36a1.548 1.548 0 0 1-1.69.328A19.898 19.898 0 0 1 5.498 8.513z'
        fillRule='nonzero'
      />
    </svg>
  )
}

SvgPhone.displayName = 'SvgPhone'
export default withStyles(styles)(SvgPhone)
