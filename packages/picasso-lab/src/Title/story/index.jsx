import { Title } from '../Title'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Lab').createPage('Title', null)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Title, name: 'Title' })

page
  .createChapter()
  .addExample('Title/story/Default.example.tsx', 'Default')
  .addExample('Title/story/Blank.example.tsx', 'Blank')
  .addExample('Title/story/Title.example.tsx', 'Title')
  .addExample('Title/story/TitleAndButton.example.tsx', 'Title and button')
  .addExample('Title/story/TitleAndTabs.example.tsx', 'Title and tabs')
  .addExample(
    'Title/story/TitleAndBreadcrumbs.example.tsx',
    'Title and breadcrumbs'
  )
  .addExample('Title/story/Steps.example.tsx', 'Steps')
  .addExample(
    'Title/story/WithRightPadding.example.tsx',
    'With right padding of the container'
  )
