import overviewBlockGroupStory from '../../OverviewBlockGroup/story'
import overviewBlockRowStory from '../../OverviewBlockRow/story'
import { OverviewBlock } from '../OverviewBlock'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'OverviewBlock',
  'Allows displaying counters.'
)

page
  .createTabChapter('Props')
  .addComponentDocs({
    component: OverviewBlock,
    name: 'OverviewBlock'
  })
  .addComponentDocs(overviewBlockGroupStory.componentDocs)
  .addComponentDocs(overviewBlockRowStory.componentDocs)

page
  .createChapter()
  .addExample('OverviewBlock/story/Default.example.tsx', 'Default')
  .addExample('OverviewBlock/story/Text.example.tsx', 'Text')
  .addExample('OverviewBlock/story/Number.example.tsx', 'Number')
  .addExample('OverviewBlock/story/Multiline.example.tsx', 'Multi-line')
  .addExample('OverviewBlock/story/Routing.example.tsx', 'Routing')

page.connect(overviewBlockGroupStory.chapter)
