import PicassoBook from '~/.storybook/components/PicassoBook'

import { ButtonGroup } from '../ButtonGroup'

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter(
      'Group of buttons',
      'You can combine multiple buttons into a single container.'
    )
    .addExample('ButtonGroup/story/ButtonGroup.example.jsx', 'Button group')
)

const componentDocs = PicassoBook.createComponentDocs(
  ButtonGroup,
  'Button.Group'
)

export default {
  chapter,
  componentDocs
}
