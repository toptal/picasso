import { Tabs } from '../Tabs'
import tabStory from '../../Tab/story'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Layout').createPage(
  'Tabs',
  `
  Tabs allow to switch between content sections

  ${PicassoBook.createBaseDocsLink(
    'https://www.figma.com/file/5SCTOPrCDcHuk5We091GBn/Product-Library?node-id=246%3A11213'
  )}

  ${PicassoBook.createSourceLink(__filename)}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Tabs, name: 'Tabs' })
  .addComponentDocs(tabStory.componentDocs)

page.createChapter()
// .addExample(
//   'Tabs/story/Default.example.tsx',
//   {
//     title: 'Default',
//     takeScreenshot: false,
//   },
//   'base/Tabs'
// )
// .addExample(
//   'Tabs/story/Vertical.example.tsx',
//   {
//     title: 'Vertical',
//     takeScreenshot: false,
//     description: '⚠️ Not responsive',
//   },
//   'base/Tabs'
// )
// .addExample(
//   'Tabs/story/ScrollButtons.example.tsx',
//   {
//     title: 'Scroll buttons',
//     takeScreenshot: false,
//   },
//   'base/Tabs'
// )
// .addExample(
//   'Tabs/story/FullWidth.example.tsx',
//   {
//     title: 'Full Width',
//     screenshotBreakpoints: true,
//   },
//   'base/Tabs'
// )
page.connect(tabStory.chapter)
