import { AlertInline } from '../AlertInline'
import PicassoBook from '~/.storybook/components/PicassoBook'

const componentDocs = PicassoBook.createComponentDocs(
  AlertInline,
  'Alert.Inline'
)

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter('Alert.Inline')
    .addExample('AlertInline/story/Default.example.tsx', { id: 'Default' })
)

export default {
  componentDocs,
  chapter
}
