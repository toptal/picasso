import { ButtonAction } from '../ButtonAction'
import PicassoBook from '~/.storybook/components/PicassoBook'

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter('Action Button', 'Action Style Button.')
    .addExample('ButtonAction/story/Default.example.tsx', 'Default')
    .addExample('ButtonAction/story/States.example.tsx', 'States')
    .addExample(
      'ButtonAction/story/CustomBackground.example.tsx',
      'Custom Background'
    )
)

const componentDocs = PicassoBook.createComponentDocs(
  ButtonAction,
  'Button.Action'
)

export default {
  chapter,
  componentDocs,
}
