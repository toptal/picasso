import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import {
  BaseProps,
  PicassoComponentWithRef,
  CompoundedComponentWithRef
} from '@toptal/picasso-shared'

import PageHead from '../PageHead'
import PageHeader from '../PageHeader'
import PageHeaderMenu from '../PageHeaderMenu'
import PageFooter from '../PageFooter'
import PageContent from '../PageContent'
import PageSidebar from '../Sidebar'
import PageBanner from '../PageBanner'
import { PageContextProps, ViewportWidthType } from './types'
import styles from './styles'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** DEPRECATED! Component becomes responsive with width 100% and overrides width prop */
  fullWidth?: boolean
  /** Define container width `wide` | `full` */
  width?: ViewportWidthType
  /** Horizontally centers the content */
  centered?: boolean
  /** Children components (`Page.Header`, `Page.Content`, `Page.Footer`) */
  children: ReactNode
}

export interface StaticProps {
  Head: typeof PageHead
  Header: typeof PageHeader
  HeaderMenu: typeof PageHeaderMenu
  Content: typeof PageContent
  Footer: typeof PageFooter
  Sidebar: typeof PageSidebar
  Banner: typeof PageBanner
}

export const PageContext = React.createContext<PageContextProps>({})

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'Page'
})

// eslint-disable-next-line react/display-name
export const Page = forwardRef<HTMLDivElement, Props>(function Page(
  props,
  ref
) {
  const classes = useStyles(props)
  const { children, className, style, width, fullWidth, ...rest } = props

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

Page.Head = PageHead

export default Page as PicassoComponentWithRef<Props, HTMLElement, StaticProps>
