import ButtonSplit from '../ButtonSplit'
import PicassoBook from '~/.storybook/components/PicassoBook'

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter(
      'Split button',
      'If you need a button with an action and dropdown at the same time.'
    )
    .addExample('ButtonSplit/story/Default.example.tsx', 'Split button')
)

const componentDocs = PicassoBook.createComponentDocs(
  ButtonSplit,
  'Button.Split'
)

export default {
  chapter,
  componentDocs
}
