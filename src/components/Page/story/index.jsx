import PicassoBook from '~/.storybook/components/PicassoBook'

import pageHeaderStory from '@components/PageHeader/story'
import pageHeaderMenuStory from '@components/PageHeaderMenu/story'
import pageContentStory from '@components/PageContent/story'
import pageFooterStory from '@components/PageFooter/story'

import { Page } from '../Page'

const page = PicassoBook.createPage('Page', `A Page component`, 'Layout')

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Page, name: 'Page' })
  .addComponentDocs(pageHeaderStory.componentDocs)
  .addComponentDocs(pageHeaderMenuStory.componentDocs)
  .addComponentDocs(pageContentStory.componentDocs)
  .addComponentDocs(pageFooterStory.componentDocs)

page
  .createChapter()
  .addExample('Page/story/Sidebar.example.jsx', 'With sidebar')

page.connect(pageHeaderStory.chapter)

page.connect(pageContentStory.chapter)

page.connect(pageFooterStory.chapter)
