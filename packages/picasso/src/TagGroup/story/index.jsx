import { TagGroup } from '../TagGroup'
import PicassoBook from '~/.storybook/components/PicassoBook'

export const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter(
      'Group of tags',
      'You can combine different variants and styles of the Tags by using <Tag.Group /> component'
    )
    .addExample('TagGroup/story/TagGroup.example.jsx', 'Tag group')
)

const componentDocs = PicassoBook.createComponentDocs(TagGroup, 'Tag.Group')

export default {
  chapter,
  componentDocs
}
