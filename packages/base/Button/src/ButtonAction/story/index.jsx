import { ButtonAction } from '../ButtonAction'
import PicassoBook from '~/.storybook/components/PicassoBook'

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter('Action Button', 'Action Style Button.')
    .addExample(
      'ButtonAction/story/Default.example.tsx',
      'Default',
      'base/Button'
    )
    .addExample(
      'ButtonAction/story/States.example.tsx',
      'States',
      'base/Button'
    )
    .addExample(
      'ButtonAction/story/CustomBackground.example.tsx',
      'Custom Background',
      'base/Button'
    )
)

const componentDocs = PicassoBook.createComponentDocs(
  ButtonAction,
  'Button.Action'
)

export default {
  chapter,
  componentDocs,
}
