import { TagRectangular } from '../TagRectangular'
import PicassoBook from '~/.storybook/components/PicassoBook'

export const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter('Rectangular tags', 'Reactangular variant of Tags.')
    .addExample('TagRectangular/story/Variants.example.tsx', {
      title: 'Variants',
      takeScreenshot: false
    })
    .addExample('TagRectangular/story/Indicators.example.tsx', {
      title: 'Indicators',
      takeScreenshot: false
    })
)

const componentDocs = PicassoBook.createComponentDocs(
  TagRectangular,
  'Tag.Rectangular'
)

export default {
  chapter,
  componentDocs
}
