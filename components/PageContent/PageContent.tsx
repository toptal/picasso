import React, { useContext, FunctionComponent, ReactNode } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import { PageContext } from '../Page'
import { PageContextProps } from '../Page/types'
import { StandardProps } from '../Picasso'
import styles from './styles'

interface Props extends StandardProps {
  /** Custom components that render content of page */
  children: ReactNode
}

export const PageContent: FunctionComponent<Props> = ({
  children,
  classes,
  className,
  style
}) => {
  const { fullWidth } = useContext<PageContextProps>(PageContext)

  const innerClassName = cx(
    {
      [classes.fullWidth]: fullWidth
    },
    classes.content
  )

  return (
    <div className={cx(classes.root, className)} style={style}>
      <div className={innerClassName}>{children}</div>
    </div>
  )
}

PageContent.displayName = 'PageContent'

export default withStyles(styles)(PageContent)
