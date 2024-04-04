import { PageTopBarCompound as PageTopBar } from '../PageTopBarCompound'
import { PageTopBarMenu } from '../PageTopBarMenu'
import { PageSidebar } from '../PageSidebar'
import Page from '../Page'
import { PageHelmet } from '../PageHelmet'
import { PageFooter } from '../PageFooter'
import { PageContent } from '../PageContent'
import { PageBanner } from '../PageBanner'
import { PageAutocomplete } from '../PageAutocomplete'
import { PageArticle } from '../PageArticle'

type PageCompoundType = typeof Page & {
  TopBar: typeof PageTopBar
  TopBarMenu: typeof PageTopBarMenu
  Content: typeof PageContent
  Footer: typeof PageFooter
  Sidebar: typeof PageSidebar
  Banner: typeof PageBanner
  Helmet: typeof PageHelmet
  Autocomplete: typeof PageAutocomplete
  Article: typeof PageArticle
}

export const PageCompound: PageCompoundType = Object.assign(Page, {
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
