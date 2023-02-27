import { ShowMore } from '../ShowMore'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'ShowMore',
  `Strips provided content.

  ${PicassoBook.createSourceLink(__filename)}
  `
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
  .addExample('ShowMore/story/ToggleDisabled.example.tsx', 'Toggle Disabled')
  .addExample('ShowMore/story/ZeroRows.example.tsx', {
    title: 'With zero rows',
    takeScreenshot: false,
  })
  .addExample('ShowMore/story/ReactChildren.example.tsx', {
    title: 'With React children',
    takeScreenshot: false,
  })
  .addExample('ShowMore/story/OnToggle.example.tsx', {
    title: 'With onToggle callback',
    takeScreenshot: false,
  })
  .addExample('ShowMore/story/ShortText.example.tsx', {
    title: 'With short text',
    description:
      'If number of lines are less than `rows` defined, the "Show More" button is hidden',
  })
