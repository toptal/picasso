import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Utils').createPage('Transitions')

page.createChapter().addExample(
  'utils/Transitions/Rotate180/story/Default.example.tsx',
  {
    title: 'Rotate180',
    description: 'Transition for 180 deg rotation',
    takeScreenshot: false,
  },
  'base/Utils'
)
