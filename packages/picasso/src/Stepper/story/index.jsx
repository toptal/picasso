import { Stepper } from '../Stepper'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'Stepper',
  `
    Stepper component display progress through a sequence of steps.
    
    ${PicassoBook.createBaseDocsLink(
      'https://share.goabstract.com/fe19eb54-183d-4359-95f2-43f93bad961c?collectionLayerId=903f1c63-750f-495e-8d0f-cdd889851fa2&mode=design'
    )}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Stepper, name: 'Stepper' })

page
  .createChapter()
  .addExample('Stepper/story/Default.example.tsx', 'Default')
  .addExample('Stepper/story/Variants.example.tsx', 'Variants')
  .addExample('Stepper/story/FullWidth.example.tsx', 'Full width')
