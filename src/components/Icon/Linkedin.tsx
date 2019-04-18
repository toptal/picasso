import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
interface Props extends StandardProps {
  width?: number
  height?: number
}

const SvgLinkedin = (props: Props) => {
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
        d='M22.072 0H2.05C.956 0 0 .787 0 1.869v20.069c0 1.087.956 2.056 2.05 2.056h20.015c1.1 0 1.925-.975 1.925-2.056V1.867C23.996.789 23.165 0 22.072 0zM7.436 20H4V9.312h3.437V20zm-1.6-12.313h-.024c-1.1 0-1.813-.818-1.813-1.843C4 4.8 4.731 4 5.855 4c1.125 0 1.813.794 1.838 1.844 0 1.025-.713 1.843-1.856 1.843zM19.997 20H16.56v-5.844c0-1.4-.5-2.356-1.744-2.356-.95 0-1.512.644-1.762 1.269-.094.225-.119.531-.119.843V20H9.5V9.312h3.436V10.8c.5-.713 1.282-1.738 3.1-1.738 2.256 0 3.962 1.488 3.962 4.694V20z'
        fillRule='evenodd'
      />
    </svg>
  )
}

SvgLinkedin.displayName = 'SvgLinkedin'
export default withStyles(styles)(SvgLinkedin)
