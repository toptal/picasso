import pageHeaderStory from '../../PageHeader/story'
import pageHeadStory from '../../PageHead/story'
import pageHeaderMenuStory from '../../PageHeaderMenu/story'
import pageContentStory from '../../PageContent/story'
import pageFooterStory from '../../PageFooter/story'
import pageBannerStory from '../../PageBanner/story'
import { Page } from '../Page'

import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Layout').createPage(
  'Page',
  'A Page component'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Page, name: 'Page' })
  .addComponentDocs(pageHeaderStory.componentDocs)
  .addComponentDocs(pageHeadStory.componentDocs)
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
  .addExample('Page/story/WideWidth.example.jsx', {
    title: 'Wide width',
    description:
      'Page has centered content and restricted width of 1440px or 90rem'
  })
  .addExample('Page/story/FullWidth.example.jsx', 'Full width')
  .addExample('Page/story/Scroll.example.jsx', 'Scroll with overflow')
  .addExample('Page/story/WithBanner.example.jsx', {
    title: 'With Banner',
    waitUntilImagesLoaded: true
  })
  .addExample('Page/story/WithCompoundBanner.example.jsx', {
    title: 'With Compound Banner',
    waitUntilImagesLoaded: true
  })

page.connect(pageHeaderStory.chapter)

page.connect(pageHeadStory.chapter)

page.connect(pageContentStory.chapter)

page.connect(pageFooterStory.chapter)

page.connect(pageBannerStory.chapter)
