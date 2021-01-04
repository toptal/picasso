import { EnvironmentBanner } from '../EnvironmentBanner'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'EnvironmentBanner',
  'Banner on page top to highlight current environment'
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
