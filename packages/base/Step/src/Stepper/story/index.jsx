import Stepper from '../Stepper'
import PicassoBook from '~/.storybook/components/PicassoBook'
import verticalStory from '../../StepperVertical/story'

const page = PicassoBook.section('Components').createPage(
  'Stepper',
  `
    Stepper component display progress through a sequence of steps.

    ${PicassoBook.createSourceLink(__filename)}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Stepper, name: 'Stepper' })
  .addComponentDocs(verticalStory.componentDocs)

page
  .createChapter()
  .addExample('Stepper/story/Default.example.tsx', 'Default', 'base/Step')
  .addExample(
    'Stepper/story/WithoutLabels.example.tsx',
    'Without Labels',
    'base/Step'
  )
  .addExample('Stepper/story/Vertical.example.tsx', 'Vertical', 'base/Step')
  .addExample(
    'Stepper/story/Overflow.example.tsx',
    {
      title: 'Overflow',
      takeScreenshot: false,
    },
    'base/Step'
  )
