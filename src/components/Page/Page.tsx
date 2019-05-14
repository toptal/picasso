import React, { FunctionComponent, ReactNode } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import PageHeader from '../PageHeader'
import PageFooter from '../PageFooter'
import PageContent from '../PageContent'
import { StandardProps, OmitInternalProps } from '../Picasso'
import { PageContextProps } from './types'
import styles from './styles'

interface Props extends StandardProps {
  /** Component becomes responsive with width 100% and overrides width prop */
  fullWidth?: boolean
  /** Define container width in `rem` */
  width?: number
  /** Horizontally centers the content */
  centered?: boolean
  /** Children components (`Page.Header`, `Page.Content`, `Page.Footer`) */
  children: ReactNode
}

interface StaticProps {
  Header: typeof PageHeader
  Content: typeof PageContent
  Footer: typeof PageFooter
}

export const PageContext = React.createContext<PageContextProps>(
  {} as PageContextProps
)

export const Page: FunctionComponent<Props> & StaticProps = ({
  children,
  classes,
  className,
  style,
  fullWidth
}) => (
  <div className={cx(classes.root, className)} style={style}>
    <PageContext.Provider value={{ fullWidth }}>
      {children}
    </PageContext.Provider>
  </div>
)

Page.defaultProps = {
  fullWidth: false
}

Page.displayName = 'Page'

Page.Header = PageHeader

Page.Content = PageContent

Page.Footer = PageFooter

export default withStyles(styles)(Page) as FunctionComponent<
  OmitInternalProps<Props>
> &
  StaticProps
