import MUIPaper from '@material-ui/core/Paper'
import { makeStyles, Theme } from '@material-ui/core/styles'
import React, { forwardRef, HTMLAttributes, ReactNode } from 'react'
import { BaseProps } from '@toptal/picasso-shared'

import styles from './styles'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** Content of component */
  elevation?: number
  children: ReactNode
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoPaper' })

export const Paper = forwardRef<HTMLDivElement, Props>(function Paper(
  props,
  ref
) {
  const { className, style, elevation, children, ...rest } = props
  const classes = useStyles()

  return (
    <MUIPaper
      {...rest}
      ref={ref}
      classes={classes}
      className={className}
      style={style}
      elevation={elevation}
      square
    >
      {children}
    </MUIPaper>
  )
})

Paper.defaultProps = {
  elevation: 1
}

Paper.displayName = 'Paper'

export default Paper
