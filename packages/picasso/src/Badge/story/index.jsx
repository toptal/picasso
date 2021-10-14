import { Badge } from '../Badge'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'Badge',
  `
    Renders a small badge.

    ${PicassoBook.createBaseDocsLink(
      'https://share.goabstract.com/c8f5bd0f-f85c-42f8-8132-20429f446f02?collectionLayerId=45b45dcc-3c86-4960-9538-58a979233959&mode=design&present=true'
    )}
  `
)

page.createTabChapter('Props').addComponentDocs({
  component: Badge,
  name: 'Badge'
})

page
  .createChapter()
  .addExample('Badge/story/Variants.example.tsx', 'Variants') // picasso-skip-visuals
  .addExample('Badge/story/Sizes.example.tsx', 'Sizes') // picasso-skip-visuals
