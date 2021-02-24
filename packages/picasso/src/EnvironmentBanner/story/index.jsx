import { EnvironmentBanner } from '../EnvironmentBanner'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'EnvironmentBanner',
  `
    Banner on page top to highlight current environment
    
    ${PicassoBook.createBaseDocsLink(
      'https://share.goabstract.com/e53c9d95-a4a7-4592-84c9-df624e3bbb45?collectionLayerId=dba24ee8-4d67-4941-84aa-502205f5e23b&mode=design&present=true'
    )}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: EnvironmentBanner, name: 'EnvironmentBanner' })

page
  .createChapter()
  .addExample('EnvironmentBanner/story/Variants.example.tsx', {
    title: 'Variants',
    description: 'Click to make them disappear'
  })
