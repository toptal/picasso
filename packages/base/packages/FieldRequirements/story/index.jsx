import { FieldRequirements } from '../FieldRequirements'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Forms').createPage(
  'FieldRequirements',
  `Component to list field requirements to be valid

  ${PicassoBook.createSourceLink(__filename)}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: FieldRequirements, name: 'FieldRequirements' })

page
  .createChapter()
  .addExample('FieldRequirements/story/Default.example.tsx', {
    title: 'Default',
    takeScreenshot: false,
  })
  .addExample('FieldRequirements/story/Error.example.tsx', {
    title: 'Error',
    takeScreenshot: false,
  })
