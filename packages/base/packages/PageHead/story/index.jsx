import { PageHead } from '../PageHead'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'PageHead',
  `${PicassoBook.createSourceLink(__filename)}`
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: PageHead, name: 'PageHead' })

page
  .createChapter()
  .addExample('PageHead/story/Default.example.tsx', 'Default')
  .addExample('PageHead/story/Blank.example.tsx', 'Blank')
  .addExample('PageHead/story/NoBorder.example.tsx', {
    title: 'No Border',
    description:
      'No border should be used only, when PageHead is followed by bordered section',
  })
  .addExample('PageHead/story/Title.example.tsx', 'Title')
  .addExample('PageHead/story/TitleAndButton.example.tsx', 'Title and button')
  .addExample('PageHead/story/TitleAndTabs.example.tsx', 'Title and tabs')
  .addExample(
    'PageHead/story/TitleAndBreadcrumbs.example.tsx',
    'Title and breadcrumbs'
  )
  .addExample('PageHead/story/Steps.example.tsx', 'Steps')
  .addExample(
    'PageHead/story/WithRightPadding.example.tsx',
    'With right padding of the container'
  )
