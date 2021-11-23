import TextEditor from '../TextEditor'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage('TextEditor')

page
  .createTabChapter('Props')
  .addComponentDocs({ component: TextEditor, name: 'TextEditor' })

page
  .createChapter()
  .addExample('TextEditor/story/Default.example.tsx', 'Default') // picasso-skip-visuals
