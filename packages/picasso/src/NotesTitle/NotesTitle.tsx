import React, { forwardRef } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps } from '@toptal/picasso-shared'
import cx from 'classnames'

import styles from './styles'
import Typography from '../Typography'

export interface Props extends BaseProps {
  children: React.ReactNode
}

const useStyles = makeStyles<Theme>(styles)

export const NotesTitle = forwardRef<HTMLDivElement, Props>(
  function NotesTitle ({ children, className, ...rest }, ref) {
    const classes = useStyles()

    return (
      <div ref={ref} className={cx(classes.root, className)} {...rest}>
        <Typography variant='heading' size='small'>
          {children}
        </Typography>
      </div>
    )
  }
)

NotesTitle.defaultProps = {}

NotesTitle.displayName = 'NotesTitle'

export default NotesTitle
