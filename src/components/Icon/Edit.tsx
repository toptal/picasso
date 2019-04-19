import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
interface Props extends StandardProps {
  width?: number
  height?: number
}

const SvgEdit = (props: Props) => {
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
        d='M14.708 5.274l3.16 3.33-8.803 9.28-3.637.48.448-3.78 8.832-9.31zM6.83 15.03l-.258 2.173 2.011-.265 7.907-8.334-1.782-1.879-7.878 8.305z'
        fillRule='nonzero'
      />
    </svg>
  )
}

SvgEdit.displayName = 'SvgEdit'
export default withStyles(styles)(SvgEdit)
