import PicassoBook from '~/.storybook/components/PicassoBook'

import { LabelGroup } from '../LabelGroup'

export const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter(
      'Group of labels',
      'You can combine different variants and styles of the Label by using <Label.Group /> component'
    )
    .addExample('LabelGroup/story/LabelGroup.example.jsx', 'Label group')
)

const componentDocs = PicassoBook.createComponentDocs(LabelGroup, 'Label.Group')

export default {
  chapter,
  componentDocs
}
