import { ShowMore } from '../ShowMore'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'ShowMore',
  'Strips provided content.'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: ShowMore, name: 'ShowMore' })

page
  .createChapter()
  .addExample('ShowMore/story/Default.example.tsx', 'Default')
  .addExample('ShowMore/story/LineBreaks.example.tsx', 'Line Breaks')
  .addExample('ShowMore/story/Expanded.example.tsx', 'Expanded')
  .addExample('ShowMore/story/CustomLimit.example.tsx', 'Custom Limit')
  .addExample('ShowMore/story/ToggleDisabled.example.tsx', 'Disabled Toggle')
  .addExample('ShowMore/story/ZeroRows.example.tsx', 'With rows={0}') // picasso-skip-visuals
  .addExample('ShowMore/story/ReactNode.example.tsx', 'With React children') // picasso-skip-visuals
