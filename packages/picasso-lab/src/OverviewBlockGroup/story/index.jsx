import OverviewBlockGroup from '../OverviewBlockGroup'
import PicassoBook from '~/.storybook/components/PicassoBook'

const componentDocs = PicassoBook.createComponentDocs(
  OverviewBlockGroup,
  'OverviewBlock.Group'
)

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter('Visual variants of the groups', '')
    .addExample(
      'OverviewBlockGroup/story/CenterAligned.example.tsx',
      'Center Aligned'
    )
    .addExample(
      'OverviewBlockGroup/story/BlockWidth.example.tsx',
      'Block Width'
    )
)

export default {
  chapter,
  componentDocs
}
