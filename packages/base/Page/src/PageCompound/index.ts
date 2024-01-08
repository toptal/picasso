import {
  PageTopBarCompound as PageTopBar,
  PageTopBarMenu,
} from '@toptal/picasso-page-top-bar'
import { PageSidebar } from '@toptal/picasso-page-sidebar'

import Page from '../Page'
import { PageHelmet } from '../PageHelmet'
import { PageFooter } from '../PageFooter'
import { PageContent } from '../PageContent'
import { PageBanner } from '../PageBanner'
import { PageAutocomplete } from '../PageAutocomplete'
import { PageArticle } from '../PageArticle'

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
