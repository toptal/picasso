import { ButtonGroup } from '../ButtonGroup'

import PicassoBook from '~/.storybook/components/PicassoBook'

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter(
      'Group of buttons',
      'You can combine multiple buttons into a single container.'
    )
    .addExample('ButtonGroup/story/ButtonGroup.example.jsx', 'Button group')
    .addExample('ButtonGroup/story/ButtonGroupWithSecondaryBlue.example.jsx', {
      title: 'Button Group With Secondary Blue'
    })
    .addExample(
      'ButtonGroup/story/ButtonGroupWithActiveSecondaryBlue.example.jsx',
      {
        title: 'Button Group With Active Secondary Blue'
      }
    )
)

const componentDocs = PicassoBook.createComponentDocs(
  ButtonGroup,
  'Button.Group'
)

export default {
  chapter,
  componentDocs
}
