import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import {
  StandardProps,
  PicassoComponentWithRef,
  CompoundedComponentWithRef
} from '@toptal/picasso-shared'

import PageHeader from '../PageHeader'
import PageHeaderMenu from '../PageHeaderMenu'
import PageFooter from '../PageFooter'
import PageContent from '../PageContent'
import PageSidebar from '../Sidebar'
import PageBanner from '../PageBanner'
import { PageContextProps, ViewportWidthType } from './types'
import styles from './styles'

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /** DEPRECATED! Component becomes responsive with width 100% and overrides width prop */
  fullWidth?: boolean
  /** Define container width `wide` | `full` */
  width?: ViewportWidthType
  /** Horizontally centers the content */
  centered?: boolean
  /** Children components (`Page.Header`, `Page.Content`, `Page.Footer`) */
  children: ReactNode
}

interface StaticProps {
  Header: typeof PageHeader
  HeaderMenu: typeof PageHeaderMenu
  Content: typeof PageContent
  Footer: typeof PageFooter
  Sidebar: typeof PageSidebar
  Banner: typeof PageBanner
}

export const PageContext = React.createContext<PageContextProps>({})

// eslint-disable-next-line react/display-name
export const Page = forwardRef<HTMLDivElement, Props>(function Page(
  { children, classes, className, style, width, fullWidth, ...rest },
  ref
) {
  return (
    <div
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      ref={ref}
      className={cx(classes.root, className)}
      style={style}
    >
      <PageContext.Provider value={{ width, fullWidth }}>
        {children}
      </PageContext.Provider>
    </div>
  )
}) as CompoundedComponentWithRef<Props, HTMLDivElement, StaticProps>

Page.displayName = 'Page'

Page.Header = PageHeader

Page.HeaderMenu = PageHeaderMenu

Page.Content = PageContent

Page.Footer = PageFooter

Page.Sidebar = PageSidebar

Page.Banner = PageBanner

export default withStyles(styles)(Page) as PicassoComponentWithRef<
  Props,
  HTMLElement,
  StaticProps
>
