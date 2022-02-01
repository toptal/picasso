import PicassoBook from '~/.storybook/components/PicassoBook'
import { NoteContent } from '../NoteContent'

const componentDocs = PicassoBook.createComponentDocs(
  NoteContent,
  'Note.Content',
  'Note content'
)

export default {
  componentDocs
}
