import topBarStory from '../../TopBar/story'
import pageHeadStory from '../../PageHead/story'
import pageHeaderMenuStory from '../../PageHeaderMenu/story'
import pageContentStory from '../../PageContent/story'
import pageFooterStory from '../../PageFooter/story'
import pageBannerStory from '../../PageBanner/story'
import pageAutocompleteStory from '../../PageAutocomplete/story'
import { Page } from '../Page'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Layout').createPage(
  'Page',
  'A Page component'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Page, name: 'Page' })
  .addComponentDocs(topBarStory.componentDocs)
  .addComponentDocs(pageHeadStory.componentDocs)
  .addComponentDocs(pageHeaderMenuStory.componentDocs)
  .addComponentDocs(pageContentStory.componentDocs)
  .addComponentDocs(pageFooterStory.componentDocs)
  .addComponentDocs(pageBannerStory.componentDocs)
  .addComponentDocs(pageAutocompleteStory.componentDocs)

page
  .createChapter()
  .addExample('Page/story/Default.example.jsx', {
    title: 'Default',
    description:
      'Page has centered content and restricted width of 1200px or 75rem',
    waitUntilImagesLoaded: true
  })
  .addExample('Page/story/WideWidth.example.jsx', {
    title: 'Wide width',
    description:
      'Page has centered content and restricted width of 1440px or 90rem',
    waitUntilImagesLoaded: true
  })
  .addExample('Page/story/FullWidth.example.jsx', {
    title: 'Full width',
    waitUntilImagesLoaded: true
  })
  .addExample('Page/story/Scroll.example.jsx', 'Scroll with overflow')
  .addExample('Page/story/WithBanner.example.jsx', {
    title: 'With Banner',
    waitUntilImagesLoaded: true
  })
  .addExample('Page/story/WithCompoundBanner.example.jsx', {
    title: 'With Compound Banner',
    waitUntilImagesLoaded: true
  })

page.connect(topBarStory.chapter)

page.connect(pageHeadStory.chapter)

page.connect(pageContentStory.chapter)

page.connect(pageFooterStory.chapter)

page.connect(pageBannerStory.chapter)

page.connect(pageAutocompleteStory.chapter)
