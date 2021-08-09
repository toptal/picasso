import PicassoBook from '~/.storybook/components/PicassoBook'
import { NoteTitle } from '../NoteTitle'

const componentDocs = PicassoBook.createComponentDocs(
  NoteTitle,
  'Note.Title',
  'Note title'
)

export default {
  componentDocs
}
