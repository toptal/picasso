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
  .addExample('ShowMore/story/LineBreaks.example.tsx', {
    title: 'Line Breaks',
    takeScreenshot: false
  }) // picasso-skip-visuals
  .addExample('ShowMore/story/Expanded.example.tsx', 'Expanded')
  .addExample('ShowMore/story/CustomLimit.example.tsx', 'Custom Limit')
  .addExample('ShowMore/story/ToggleDisabled.example.tsx', 'Disabled Toggle')
  .addExample('ShowMore/story/ZeroRows.example.tsx', {
    title: 'With rows={0}',
    takeScreenshot: false
  }) // picasso-skip-visuals
  .addExample('ShowMore/story/ReactNode.example.tsx', {
    title: 'With React children',
    takeScreenshot: false
  }) // picasso-skip-visuals
