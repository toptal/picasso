import PicassoBook from '~/.storybook/components/PicassoBook'

import { LabelGroup } from '../LabelGroup'

const page = PicassoBook.lookupPage('Label')

page
  .createChapter(
    'Group of labels',
    'You can combine different variants and styles of the Label by using <Label.Group /> component'
  )
  .addComponentDocs(LabelGroup)
  .addExample('LabelGroup/story/LabelGroup.example.jsx', 'Label group')
