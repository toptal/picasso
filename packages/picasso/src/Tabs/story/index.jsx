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

  ${PicassoBook.createSourceLink(__filename)}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Tabs, name: 'Tabs' })
  .addComponentDocs(tabStory.componentDocs)

page
  .createChapter()
  .addExample('Tabs/story/Default.example.tsx', {
    title: 'Default',
    takeScreenshot: false,
  })
  .addExample('Tabs/story/Vertical.example.tsx', {
    title: 'Vertical',
    takeScreenshot: false,
  })
  .addExample('Tabs/story/ScrollButtons.example.tsx', {
    title: 'Scroll buttons',
    takeScreenshot: false,
  })
page.connect(tabStory.chapter)
