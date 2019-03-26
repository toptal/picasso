import React, { useContext } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import { Classes } from '../styles/types'
import { PageContext } from '../Page'
import { PageContextProps } from '../Page/types'
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
    classes.content
  )

  return (
    <div className={classes.root}>
      <div className={innerClassName}>{children}</div>
    </div>
  )
}

PageContent.displayName = 'PageContent'

export default withStyles(styles)(PageContent)
