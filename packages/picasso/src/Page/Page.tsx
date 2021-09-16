import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import { BaseProps } from '@toptal/picasso-shared'

import PageHelmet from '../PageHelmet'
import PageTopBar from '../PageTopBar'
import PageTopBarMenu from '../PageTopBarMenu'
import PageFooter from '../PageFooter'
import PageContent from '../PageContent'
import PageBanner from '../PageBanner'
import PageAutocomplete from '../PageAutocomplete'
import PageArticle from '../PageArticle'
import { PageContextProps, ViewportWidthType } from './types'
import PageSidebar from '../Sidebar'
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

export const PageContext = React.createContext<PageContextProps>({})

const useStyles = makeStyles<Theme>(styles, {
  name: 'Page'
})

// eslint-disable-next-line react/display-name
export const Page = forwardRef<HTMLDivElement, Props>(function Page(
  props,
  ref
) {
  const { children, className, style, width, fullWidth, ...rest } = props
  const classes = useStyles()

  return (
    <div
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
})

Page.displayName = 'Page'

export default Object.assign(Page, {
  TopBar: PageTopBar,
  TopBarMenu: PageTopBarMenu,
  Content: PageContent,
  Footer: PageFooter,
  Sidebar: PageSidebar,
  Banner: PageBanner,
  Helmet: PageHelmet,
  Autocomplete: PageAutocomplete,
  Article: PageArticle
})
