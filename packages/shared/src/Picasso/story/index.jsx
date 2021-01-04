import Picasso from '../Picasso'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'Picasso',
  `
      The wrapper and the root component.
      &nbsp;  
      &nbsp;  

      All the rest of the components from Picasso library
      should be used only as nested in Picasso component.
      The preferred way to do that - to wrap your app within
      the <Picasso> component.
    `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Picasso, name: 'Picasso' })

page
  .createChapter()
  .addExample('Picasso/story/Default.example.tsx', 'Default')
  .addExample(
    'Picasso/story/DisableResponsiveUI.example.tsx',
    'Responsive Disabled'
  ) // picasso-skip-visuals
