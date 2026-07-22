import pageHelmetStory from '../../PageHelmet/story'
import pageContentStory from '../../PageContent/story'
import pageFooterStory from '../../PageFooter/story'
import pageBannerStory from '../../PageBanner/story'
import pageAutocompleteStory from '../../PageAutocomplete/story'
import pageArticleStory from '../../PageArticle/story'
import { Page } from '../Page'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Layout').createPage(
  'Page',
  `A Page component.

  Content width, padding and header height are set as CSS variables on the Page
  root, so you can override them per page through \`className\` (it wins by the
  cascade) — e.g. \`<Page className="[--content-width:80em]" />\` widens the content
  column. Variables: \`--content-width\` (default width), \`--content-width-wide\`
  (used by \`width="wide"\`), \`--content-padding-horizontal\`, \`--header-height\`.

  ${PicassoBook.createSourceLink(__filename)}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Page, name: 'Page' })
  .addComponentDocs(pageHelmetStory.componentDocs)
  .addComponentDocs(pageContentStory.componentDocs)
  .addComponentDocs(pageArticleStory.componentDocs)
  .addComponentDocs(pageFooterStory.componentDocs)
  .addComponentDocs(pageBannerStory.componentDocs)
  .addComponentDocs(pageAutocompleteStory.componentDocs)

page
  .createChapter()
  .addExample(
    'Page/story/Default.example.tsx',
    {
      title: 'Default',
      description:
        'Page has centered content and restricted width of 1200px or 75rem',
    },
    'base/Page'
  )
  .addExample(
    'Page/story/WideWidth.example.tsx',
    {
      title: 'Wide width',
      description:
        'Page has centered content and restricted width of 1440px or 90rem',
    },
    'base/Page'
  )
  .addExample(
    'Page/story/FullWidth.example.tsx',
    {
      title: 'Full width',
    },
    'base/Page'
  )
  .addExample(
    'Page/story/Scroll.example.tsx',
    'Scroll with overflow',
    'base/Page'
  )
  .addExample(
    'Page/story/WithBanner.example.tsx',
    {
      title: 'With Banner',
    },
    'base/Page'
  )
  .addExample(
    'Page/story/WithCompoundBanner.example.tsx',
    {
      title: 'With Compound Banner',
    },
    'base/Page'
  )
  .addExample(
    'Page/story/WithBannerAndSidebar.example.tsx',
    {
      title: 'With Banner and Sidebar',
    },
    'base/Page'
  )

page.connect(pageHelmetStory.chapter)

page.connect(pageContentStory.chapter)

page.connect(pageArticleStory.chapter)

page.connect(pageFooterStory.chapter)

page.connect(pageBannerStory.chapter)

page.connect(pageAutocompleteStory.chapter)
