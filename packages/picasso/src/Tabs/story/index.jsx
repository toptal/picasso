import { Tabs } from '../Tabs'
import tabStory from '../../Tab/story'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Layout').createPage(
  'Tabs',
  `
  Tabs allow to switch between content sections

  ${PicassoBook.createBaseDocsLink(
    'https://share.goabstract.com/7263b996-174b-4d0c-b5aa-22344bfba249?mode=build&sha=baf4205fe8e730f6bc50c064446103ccc8c988f1'
  )}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Tabs, name: 'Tabs' })
  .addComponentDocs(tabStory.componentDocs)

page
  .createChapter()
  .addExample('Tabs/story/Default.example.tsx', 'Default') // picasso-skip-visuals
  .addExample('Tabs/story/ScrollButtons.example.tsx', 'Scroll buttons') // picasso-skip-visuals
page.connect(tabStory.chapter)
