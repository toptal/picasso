import { ProgressBar } from '../ProgressBar'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'ProgressBar',
  `

  ${PicassoBook.createSourceLink(__filename)}
`
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: ProgressBar, name: 'ProgressBar' })

page
  .createChapter()
  .addExample(
    'ProgressBar/story/Default.example.tsx',
    {
      title: 'Default',
      takeScreenshot: false,
    },
    'base/FileInput'
  )
  .addExample(
    'ProgressBar/story/WithPercentage.example.tsx',
    'With Percentage',
    'base/FileInput'
  )
  .addExample(
    'ProgressBar/story/AnimatingProgressChange.example.tsx',
    {
      title: 'Animating Progress Change',
      takeScreenshot: false,
    },
    'base/FileInput'
  )
