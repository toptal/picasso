import PicassoBook from '.storybook/components/PicassoBook'

import { ButtonGroup } from '../ButtonGroup'

const page = PicassoBook.lookupPage('Button')

page
  .createChapter(
    'Group of buttons',
    'You can combine multiple buttons into a single container.'
  )
  .addComponentDocs(ButtonGroup)
  .addExample('ButtonGroup/story/ButtonGroup.example.jsx', 'Button group')
