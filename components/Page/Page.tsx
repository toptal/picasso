import React, { FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'

import Header from '../Header'
import Footer from '../Footer'
import PageContent from '../PageContent'
import { Classes } from '../styles/types'
import { PageContextProps } from './types'
import styles from './styles'

interface StylesProps {
  classes: Classes
}
interface Props {
  /** Component becomes responsive with width 100% and overrides width prop */
  fullWidth?: boolean
  /** Define container width in `rem` */
  width?: number
  /** Horizontally centers the content */
  centered?: boolean
  /** Children components (`Page.Header`, `Page.Content`, `Page.Footer`) */
  children: React.ReactNode
}

interface StaticProps {
  Header: typeof Header
  Content: typeof PageContent
  Footer: typeof Footer
}

export const PageContext = React.createContext<PageContextProps>(
  {} as PageContextProps
)

export const Page: FunctionComponent<Props & StylesProps> &
StaticProps = props => {
  const { children, classes, fullWidth } = props

  return (
    <div className={classes.root}>
      <PageContext.Provider value={{ fullWidth }}>
        {children}
      </PageContext.Provider>
    </div>
  )
}

Page.defaultProps = {
  fullWidth: false
}

Page.displayName = 'Page'

Page.Header = Header

Page.Content = PageContent

Page.Footer = Footer

export default withStyles(styles)(Page) as FunctionComponent<Props> &
  StaticProps
