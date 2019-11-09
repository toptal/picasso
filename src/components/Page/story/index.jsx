import PicassoBook from '~/.storybook/components/PicassoBook'

import pageHeaderStory from '@components/PageHeader/story'
import pageHeaderMenuStory from '@components/PageHeaderMenu/story'
import pageContentStory from '@components/PageContent/story'
import pageFooterStory from '@components/PageFooter/story'
import pageBannerStory from '@components/PageBanner/story'

import { Page } from '../Page'

const page = PicassoBook.createPage('Page', `A Page component`, 'Layout')

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Page, name: 'Page' })
  .addComponentDocs(pageHeaderStory.componentDocs)
  .addComponentDocs(pageHeaderMenuStory.componentDocs)
  .addComponentDocs(pageContentStory.componentDocs)
  .addComponentDocs(pageFooterStory.componentDocs)
  .addComponentDocs(pageBannerStory.componentDocs)

page
  .createChapter()
  .addExample('Page/story/Default.example.jsx', {
    title: 'Default',
    description:
      'Page has centered content and restricted width of 1200px or 75rem'
  })
  .addExample('Page/story/FullWidth.example.jsx', 'Full width')
  .addExample('Page/story/Scroll.example.jsx', 'Scroll with overflow')
  .addExample('Page/story/WithBanner.example.jsx', 'With Banner')

page.connect(pageHeaderStory.chapter)

page.connect(pageContentStory.chapter)

page.connect(pageFooterStory.chapter)

page.connect(pageBannerStory.chapter)
