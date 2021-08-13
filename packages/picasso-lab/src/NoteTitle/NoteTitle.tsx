import React, { forwardRef } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps } from '@toptal/picasso-shared'
import cx from 'classnames'
import { Typography } from '@toptal/picasso'

import styles from './styles'

export interface Props extends BaseProps {
  children: React.ReactNode
}

const useStyles = makeStyles<Theme>(styles)

export const NoteTitle = forwardRef<HTMLDivElement, Props>(function NoteTitle (
  { children, className, ...rest },
  ref
) {
  const classes = useStyles()

  return (
    <div ref={ref} className={cx(classes.root, className)} {...rest}>
      <Typography variant='heading' size='small'>
        {children}
      </Typography>
    </div>
  )
})

NoteTitle.defaultProps = {}

NoteTitle.displayName = 'NoteTitle'

export default NoteTitle
