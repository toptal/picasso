import PicassoBook from '~/.storybook/components/PicassoBook'

import pageHeaderStory from '@components/PageHeader/story'
import pageContentStory from '@components/PageContent/story'
import pageFooterStory from '@components/PageFooter/story'

import { Page } from '../Page'

const page = PicassoBook.createPage('Page', `A Page component`, 'Layout')

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Page, name: 'Page' })
  .addComponentDocs(pageHeaderStory.componentDocs)
  .addComponentDocs(pageContentStory.componentDocs)
  .addComponentDocs(pageFooterStory.componentDocs)

page
  .createChapter()
  .addExample('Page/story/Default.example.jsx', {
    title: 'Default',
    description:
      'Page has centered content and restricted width of 1200px or 75rem'
  })
  .addExample('Page/story/FullWidth.example.jsx', 'Full width')
  .addExample('Page/story/Scroll.example.jsx', 'Scroll with overflow')

page.connect(pageHeaderStory.chapter)

page.connect(pageContentStory.chapter)

page.connect(pageFooterStory.chapter)
