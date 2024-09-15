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
  .addExample('PageHead/story/Default.example.tsx', 'Default', 'base/Page')
  .addExample('PageHead/story/Blank.example.tsx', 'Blank', 'base/Page')
  .addExample(
    'PageHead/story/NoBorder.example.tsx',
    {
      title: 'No Border',
      description:
        'No border should be used only, when PageHead is followed by bordered section',
    },
    'base/Page'
  )
  .addExample('PageHead/story/Title.example.tsx', 'Title', 'base/Page')
  .addExample('PageHead/story/Steps.example.tsx', 'Steps', 'base/Page')
  .addExample(
    'PageHead/story/TitleAndButton.example.tsx',
    'Title and button',
    'base/Page'
  )
  .addExample(
    'PageHead/story/TitleAndTabs.example.tsx',
    'Title and tabs',
    'base/Page'
  )
  .addExample(
    'PageHead/story/TitleAndBreadcrumbs.example.tsx',
    'Title and breadcrumbs',
    'base/Page'
  )
  .addExample(
    'PageHead/story/WithRightPadding.example.tsx',
    'With right padding of the container',
    'base/Page'
  )
  .addExample(
    'PageHead/story/WithEnabledMinHeight.example.tsx',
    'With enabled min height for the container',
    'base/Page'
  )
