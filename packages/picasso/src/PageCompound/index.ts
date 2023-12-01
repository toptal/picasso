/* eslint-disable import/no-extraneous-dependencies */
import Page from '@toptal/picasso-page'
import PageHelmet from '@toptal/picasso-page-helmet'
import { PageTopBarCompound as PageTopBar } from '@toptal/picasso-page-top-bar-compound'
import PageTopBarMenu from '@toptal/picasso-page-top-bar-menu'
import PageFooter from '@toptal/picasso-page-footer'
import PageContent from '@toptal/picasso-page-content'
import PageBanner from '@toptal/picasso-page-banner'
import PageAutocomplete from '@toptal/picasso-page-autocomplete'
import PageArticle from '@toptal/picasso-page-article'
import PageSidebar from '@toptal/picasso-page-sidebar'

export const PageCompound = Object.assign(Page, {
  TopBar: PageTopBar,
  TopBarMenu: PageTopBarMenu,
  Content: PageContent,
  Footer: PageFooter,
  Sidebar: PageSidebar,
  Banner: PageBanner,
  Helmet: PageHelmet,
  Autocomplete: PageAutocomplete,
  Article: PageArticle,
})
