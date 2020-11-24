import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import {
  BaseProps,
  PicassoComponentWithRef,
  CompoundedComponentWithRef
} from '@toptal/picasso-shared'

import PageHead from '../PageHead'
import TopBar from '../TopBar'
import TopBarMenu from '../TopBarMenu'
import PageFooter from '../PageFooter'
import PageContent from '../PageContent'
import PageSidebar from '../Sidebar'
import PageBanner from '../PageBanner'
import PageAutocomplete from '../PageAutocomplete'
import { PageContextProps, ViewportWidthType } from './types'
import styles from './styles'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** DEPRECATED! Component becomes responsive with width 100% and overrides width prop */
  fullWidth?: boolean
  /** Define container width `wide` | `full` */
  width?: ViewportWidthType
  /** Horizontally centers the content */
  centered?: boolean
  /** Children components (`Page.TopBar`, `Page.Content`, `Page.Footer`) */
  children: ReactNode
}

export interface StaticProps {
  Head: typeof PageHead
  TopBar: typeof TopBar
  HeaderMenu: typeof TopBarMenu
  Content: typeof PageContent
  Footer: typeof PageFooter
  Sidebar: typeof PageSidebar
  Banner: typeof PageBanner
  Autocomplete: typeof PageAutocomplete
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

Page.TopBar = TopBar

Page.TopBarMenu = TopBarMenu

Page.Content = PageContent

Page.Footer = PageFooter

Page.Sidebar = PageSidebar

Page.Banner = PageBanner

Page.Head = PageHead

Page.Autocomplete = PageAutocomplete

export default Page as PicassoComponentWithRef<Props, HTMLElement, StaticProps>
