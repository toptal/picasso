import { Subheader } from '../Subheader'

import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Lab').createPage('Subheader', null)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Subheader, name: 'Subheader' })

page
  .createChapter()
  .addExample('Subheader/story/Default.example.tsx', 'Default')
  .addExample('Subheader/story/Blank.example.tsx', 'Blank')
  .addExample('Subheader/story/Title.example.tsx', 'Title')
  .addExample('Subheader/story/TitleAndButton.example.tsx', 'Title and button')
  .addExample('Subheader/story/TitleAndTabs.example.tsx', 'Title and tabs')
  .addExample(
    'Subheader/story/TitleAndBreadcrumbs.example.tsx',
    'Title and breadcrumbs'
  )
  .addExample('Subheader/story/Steps.example.tsx', 'Steps')
  .addExample(
    'Subheader/story/WithRightPadding.example.tsx',
    'With right padding of the container'
  )
