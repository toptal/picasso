import React, { forwardRef } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps } from '@toptal/picasso-shared'
import cx from 'classnames'

import styles from './styles'

export interface Props extends BaseProps {
  children: React.ReactNode
}

const useStyles = makeStyles<Theme>(styles)

export const Note = forwardRef<HTMLDivElement, Props>(function Note(
  { children, className, ...rest },
  ref
) {
  const classes = useStyles()

  return (
    <div ref={ref} className={cx(classes.root, className)} {...rest}>
      {children}
    </div>
  )
})

Note.displayName = 'Note'

export default Note
