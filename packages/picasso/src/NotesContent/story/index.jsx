import PicassoBook from '~/.storybook/components/PicassoBook'
import { NotesContent } from '../NotesContent'

const componentDocs = PicassoBook.createComponentDocs(
  NotesContent,
  'Notes.Content',
  'Notes content'
)

export default {
  componentDocs
}
