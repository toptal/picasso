import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import { Paper as MUIPaper } from '@material-ui/core'
import type { HTMLAttributes, ReactNode } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'

import styles from './styles'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** Content of component */
  elevation?: number
  children: ReactNode
  'data-testid'?: string
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoPaper' })

export const Paper = forwardRef<HTMLDivElement, Props>(function Paper(
  props,
  ref
) {
  const {
    className,
    style,
    elevation,
    children,
    'data-testid': dataTestId,
    ...rest
  } = props
  const classes = useStyles()

  return (
    <MUIPaper
      {...rest}
      ref={ref}
      classes={classes}
      className={className}
      style={style}
      elevation={elevation}
      data-testid={dataTestId}
      square
    >
      {/* TODO: remove before merge */}
      <div className='bg-green-500 text-xxl'>TEST</div>
      {children}
    </MUIPaper>
  )
})

Paper.defaultProps = {
  elevation: 1,
}

Paper.displayName = 'Paper'

export default Paper
