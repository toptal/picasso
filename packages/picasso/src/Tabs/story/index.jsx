import { Tabs } from '../Tabs'
import tabStory from '../../Tab/story'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Layout').createPage(
  'Tabs',
  'Tabs allow to switch between content sections'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Tabs, name: 'Tabs' })
  .addComponentDocs(tabStory.componentDocs)

page
  .createChapter()
  .addExample('Tabs/story/Default.example.tsx', 'Default')
  .addExample('Tabs/story/ScrollButtons.example.tsx', 'Scroll buttons')
page.connect(tabStory.chapter)
