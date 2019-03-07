import React, { useContext } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import { Classes } from '../styles/types'
import { PageContext, PageContextProps } from './Page'
import styles from './styles'

interface Props {
  classes: Classes
  /** Custom components that render content of page */
  children: React.ReactNode
}

export const PageContent: React.FunctionComponent<Props> = props => {
  const { children, classes } = props

  const { fullWidth } = useContext<PageContextProps>(PageContext)

  const innerClassName = cx(
    {
      [classes.fullWidth]: fullWidth
    },
    classes.pageContentInner
  )

  return (
    <div className={classes.pageContentRoot}>
      <div className={innerClassName}>{children}</div>
    </div>
  )
}

export default withStyles(styles)(PageContent)
