import { TagRectangular } from '../TagRectangular'
import PicassoBook from '~/.storybook/components/PicassoBook'

export const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter('Rectangular tags', 'Reactangular variant of Tags.')
    .addExample('TagRectangular/story/Colors.example.tsx', 'Colors')
    .addExample('TagRectangular/story/Indicators.example.tsx', 'Indicators')
)

const componentDocs = PicassoBook.createComponentDocs(
  TagRectangular,
  'Tag.Rectangular'
)

export default {
  chapter,
  componentDocs
}
