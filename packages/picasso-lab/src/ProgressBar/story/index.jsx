import { ProgressBar } from '../ProgressBar'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Picasso Lab').createPage(
  'ProgressBar',
  `
  ${PicassoBook.createBaseDocsLink(
    'https://share.goabstract.com/4bd9b65d-c997-4c2a-a656-fcf29694cb20?mode=design&present=true&sha=ff4cdea1e7d6422f35083b4c419155d0eb92ea5a'
  )}
`
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: ProgressBar, name: 'ProgressBar' })

page
  .createChapter()
  .addExample('ProgressBar/story/Default.example.tsx', 'Default') // picasso-skip-visuals
  .addExample('ProgressBar/story/WithPercentage.example.tsx', 'With Percentage') // picasso-skip-visuals
  .addExample(
    'ProgressBar/story/AnimatingProgressChange.example.tsx',
    'Animating Progress Change'
  ) // picasso-skip-visuals
