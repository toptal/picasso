import { ButtonSplit } from '../ButtonSplit'
import PicassoBook from '~/.storybook/components/PicassoBook'

const chapter = PicassoBook.connectToPage(
  page =>
    page
      .createChapter('Split Button', 'Combine dropdown with menu and a button.')
      // TODO: variants already covered by states, cna be removed
      .addExample('ButtonSplit/story/Variants.example.tsx', 'Variants') // picasso-skip-visuals
      .addExample('ButtonSplit/story/States.example.tsx', 'States') // picasso-skip-visuals
      .addExample('ButtonSplit/story/Sizes.example.tsx', 'Sizes') // picasso-skip-visuals
)

const componentDocs = PicassoBook.createComponentDocs(
  ButtonSplit,
  'Button.Split'
)

export default {
  chapter,
  componentDocs
}
