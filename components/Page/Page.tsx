import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import Header from '../Header'
import Footer from '../Footer'
import { Classes } from '../styles/types'
import styles from './styles'
import PageContent from './PageContent'

interface Props {
  /** Component becomes responsive with width 100% and overrides width prop */
  fullWidth?: boolean
  /** Define container width in rem */
  width?: number
  /** Horizontally centers content */
  centered?: boolean
  classes: Classes
  /** Children components (Page.Header, Page.Content, Page.Footer) */
  children: React.ReactNode
}

export interface PageContextProps {
  fullWidth?: boolean
}

export const PageContext = React.createContext<PageContextProps>(
  {} as PageContextProps
)

export const Page: React.FunctionComponent<Props> = props => {
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

// @ts-ignore
Page.Header = Header

// @ts-ignore
Page.Content = PageContent

// @ts-ignore
Page.Footer = Footer

export default withStyles(styles)(Page)
