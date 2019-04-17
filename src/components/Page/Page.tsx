import React, { FunctionComponent, ReactNode } from 'react'
import { Overwrite } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import Header from '../Header'
import Footer from '../Footer'
import PageContent from '../PageContent'
import { StandardProps, JssProps } from '../Picasso'
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
  Header: typeof Header
  Content: typeof PageContent
  Footer: typeof Footer
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

Page.Header = Header

Page.Content = PageContent

Page.Footer = Footer

export default withStyles(styles)(Page) as FunctionComponent<
  Overwrite<Props, Partial<JssProps>>
> &
  StaticProps
