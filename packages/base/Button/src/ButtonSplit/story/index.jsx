import { ButtonSplit } from '../ButtonSplit'
import PicassoBook from '~/.storybook/components/PicassoBook'

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter('Split Button', 'Combine dropdown with menu and a button.')
    .addExample(
      'ButtonSplit/story/Variants.example.tsx',
      'Variants',
      'base/Button'
    )
    .addExample('ButtonSplit/story/Sizes.example.tsx', 'Sizes', 'base/Button')
    // happo makes snapshot of the DOM and replicates it on their machine to make a screenshot
    // so focused, active and other states of the button are lost
    .addExample('ButtonSplit/story/States.example.tsx', 'States', 'base/Button')
)

const componentDocs = PicassoBook.createComponentDocs(
  ButtonSplit,
  'Button.Split'
)

export default {
  chapter,
  componentDocs,
}
