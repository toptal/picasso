import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Utils').createPage('Shadows')

page
  .createChapter()
  .addExample(
    'utils/Shadows/story/HowToUse.example.tsx',
    {
      title: 'How to use',
      takeScreenshot: false,
    },
    'base/Utils'
  )
  .addExample(
    'utils/Shadows/story/Default.example.tsx',
    'Shadows',
    'base/Utils'
  )
