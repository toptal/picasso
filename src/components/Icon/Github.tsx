import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
interface Props extends StandardProps {
  size?: number
  color?: string
}

const SvgGithub = (props: Props) => {
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
        fillRule='evenodd'
        d='M12 0C5.373 0 0 5.513 0 12.305 0 17.743 3.44 22.35 8.207 23.98a.94.94 0 0 0 .204.021c.444 0 .616-.327.616-.61 0-.295-.01-1.067-.016-2.095-.45.101-.852.144-1.211.144-2.309 0-2.834-1.794-2.834-1.794-.546-1.42-1.334-1.8-1.334-1.8-1.045-.734-.005-.756.075-.756h.006c1.205.107 1.837 1.275 1.837 1.275.6 1.05 1.404 1.345 2.121 1.345.563 0 1.072-.182 1.372-.322.107-.792.418-1.333.76-1.644-2.662-.31-5.464-1.366-5.464-6.08 0-1.345.466-2.443 1.232-3.3-.123-.311-.535-1.565.118-3.258 0 0 .086-.026.268-.026.434 0 1.414.166 3.032 1.29a11.241 11.241 0 0 1 3.006-.412c1.018.006 2.046.14 3.005.413 1.618-1.125 2.598-1.291 3.032-1.291.182 0 .268.026.268.026.654 1.693.241 2.947.118 3.258.766.862 1.232 1.96 1.232 3.3 0 4.724-2.807 5.764-5.48 6.07.428.38.814 1.13.814 2.276 0 1.645-.016 2.973-.016 3.375 0 .29.166.616.61.616.065 0 .14-.005.215-.021C20.566 22.35 24 17.738 24 12.305 24 5.513 18.627 0 12 0z'
      />
    </svg>
  )
}

SvgGithub.displayName = 'SvgGithub'
export default withStyles(styles)(SvgGithub)
