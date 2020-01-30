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
  .addExample('ShowMore/story/Default.example.jsx', 'Default')
  .addExample('ShowMore/story/Expanded.example.jsx', 'Expanded')
  .addExample('ShowMore/story/CustomLimit.example.jsx', 'Custom Limit')
  .addExample('ShowMore/story/ToggleDisabled.example.jsx', 'Disabled Toggle')
