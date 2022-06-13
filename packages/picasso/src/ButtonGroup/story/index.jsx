import { ButtonGroup } from '../ButtonGroup'
import PicassoBook from '~/.storybook/components/PicassoBook'

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter(
      'Group of buttons',
      'You can combine multiple buttons into a single container.'
    )
    .addExample('ButtonGroup/story/ButtonGroup.example.tsx', 'Button group')
    .addExample(
      'ButtonGroup/story/ButtonGroupNested.example.tsx',
      'Nested Button Group'
    )
)

const componentDocs = PicassoBook.createComponentDocs(
  ButtonGroup,
  'Button.Group'
)

export default {
  chapter,
  componentDocs,
}
