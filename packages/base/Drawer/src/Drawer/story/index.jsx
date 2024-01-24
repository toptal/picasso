import { Drawer } from '../Drawer'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'Drawer',
  `
    Allows rendering a sidebar with custom content
    
    ${PicassoBook.createBaseDocsLink(
      'https://share.goabstract.com/22ba178c-50b8-4eb3-9eeb-e527fbed15e5?collectionLayerId=e9a36438-d8c9-42a4-94bc-ea134fd2e2a1&mode=design&present=true'
    )}

    ${PicassoBook.createSourceLink(__filename)}
  `
)

page.createTabChapter('Props').addComponentDocs({
  component: Drawer,
  name: 'Drawer',
})

page
  .createChapter()
  .addExample(
    'Drawer/story/Default.example.tsx',
    {
      title: 'Default',
      takeScreenshot: false,
    },
    'base/Drawer'
  )
  .addExample(
    'Drawer/story/WithBodyScrollLock.example.tsx',
    {
      title: 'With body scroll lock',
      takeScreenshot: false,
    },
    'base/Drawer'
  )
  .addExample(
    'Drawer/story/WithoutTitle.example.tsx',
    {
      title: 'Without Title',
      takeScreenshot: false,
    },
    'base/Drawer'
  )
  .addExample(
    'Drawer/story/CustomTitle.example.tsx',
    {
      title: 'Custom Title',
      takeScreenshot: false,
    },
    'base/Drawer'
  )
  .addExample(
    'Drawer/story/Widths.example.tsx',
    {
      title: 'Width',
      takeScreenshot: false,
    },
    'base/Drawer'
  )
  .addExample(
    'Drawer/story/DrawerAndNotification.example.tsx',
    {
      title: 'With notification',
      takeScreenshot: false,
    },
    'base/Drawer'
  )
  .addExample(
    'Drawer/story/WithTransparentBackdrop.example.tsx',
    {
      title: 'With transparent backdrop',
      takeScreenshot: false,
    },
    'base/Drawer'
  )
