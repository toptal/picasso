import { ProgressBar } from '../ProgressBar'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'ProgressBar',
  `
  ${PicassoBook.createBaseDocsLink(
    'https://share.goabstract.com/4bd9b65d-c997-4c2a-a656-fcf29694cb20?mode=design&present=true&sha=ff4cdea1e7d6422f35083b4c419155d0eb92ea5a'
  )}

  ${PicassoBook.createSourceLink(__filename)}
`
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: ProgressBar, name: 'ProgressBar' })

page
  .createChapter()
  .addExample('ProgressBar/story/Default.example.tsx', {
    title: 'Default',
    takeScreenshot: false,
  })
  .addExample('ProgressBar/story/WithPercentage.example.tsx', 'With Percentage')
  .addExample('ProgressBar/story/AnimatingProgressChange.example.tsx', {
    title: 'Animating Progress Change',
    takeScreenshot: false,
  })
