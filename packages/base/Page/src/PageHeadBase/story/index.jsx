import { PageHeadBase } from '../PageHeadBase'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'PageHeadBase',
  `${PicassoBook.createSourceLink(__filename)}`
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: PageHeadBase, name: 'PageHeadBase' })

page
  .createChapter()
  .addExample('PageHeadBase/story/Default.example.tsx', 'Default', 'base/Page')
  .addExample('PageHeadBase/story/Blank.example.tsx', 'Blank', 'base/Page')
  .addExample(
    'PageHeadBase/story/NoBorder.example.tsx',
    {
      title: 'No Border',
      description:
        'No border should be used only, when PageHead is followed by bordered section',
    },
    'base/Page'
  )
  .addExample('PageHeadBase/story/Title.example.tsx', 'Title', 'base/Page')
  .addExample('PageHeadBase/story/Steps.example.tsx', 'Steps', 'base/Page')
  .addExample('PageHeadBase/story/Loading.example.tsx', 'Loading', 'base/Page')
  .addExample(
    'PageHeadBase/story/TitleAndButton.example.tsx',
    'Title and button',
    'base/Page'
  )
  .addExample(
    'PageHeadBase/story/TitleAndTabs.example.tsx',
    'Title and tabs',
    'base/Page'
  )
  .addExample(
    'PageHeadBase/story/TitleAndBreadcrumbs.example.tsx',
    'Title and breadcrumbs',
    'base/Page'
  )
  .addExample(
    'PageHeadBase/story/Notification.example.tsx',
    'Notification',
    'base/Page'
  )
  .addExample(
    'PageHeadBase/story/NotificationAndTabs.example.tsx',
    'NotificationAndTabs',
    'base/Page'
  )
  .addExample(
    'PageHeadBase/story/WithRightPadding.example.tsx',
    'With right padding of the container',
    'base/Page'
  )
