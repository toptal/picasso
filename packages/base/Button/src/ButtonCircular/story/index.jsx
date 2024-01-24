import { ButtonCircular } from '../ButtonCircular'
import PicassoBook from '~/.storybook/components/PicassoBook'

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter('Circular Button', 'Circular Style Button.')
    .addExample(
      'ButtonCircular/story/Default.example.tsx',
      'Default',
      'base/Button'
    )
    .addExample(
      'ButtonCircular/story/Responsive.example.tsx',
      {
        title: 'Responsive',
        description:
          'BASE design recommends using 24px icons on screens below the xl breakpoint',
        screenshotBreakpoints: true,
      },
      'base/Button'
    )
    .addExample(
      'ButtonCircular/story/Variants.example.tsx',
      'Variants',
      'base/Button'
    )
    .addExample(
      'ButtonCircular/story/States.example.tsx',
      'States',
      'base/Button'
    )
)

const componentDocs = PicassoBook.createComponentDocs(
  ButtonCircular,
  'Button.Circular'
)

export default {
  chapter,
  componentDocs,
}
