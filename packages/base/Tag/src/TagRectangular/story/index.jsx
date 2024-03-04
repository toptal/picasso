import { TagRectangular } from '../TagRectangular'
import PicassoBook from '~/.storybook/components/PicassoBook'

export const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter('Rectangular tags', 'Reactangular variant of Tags.')
    .addExample(
      'TagRectangular/story/Variants.example.tsx',
      'Variants',
      'base/Tag'
    )
    .addExample(
      'TagRectangular/story/Indicators.example.tsx',
      'Indicators',
      'base/Tag'
    )
)

const componentDocs = PicassoBook.createComponentDocs(
  TagRectangular,
  'Tag.Rectangular'
)

export default {
  chapter,
  componentDocs,
}
