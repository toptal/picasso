import { Drawer } from '../Drawer'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'Drawer',
  `
    Allows rendering a sidebar with custom content

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
  .addExample(
    'Drawer/story/WithDisabledBackdrop.example.tsx',
    {
      title: 'With disabled backdrop',
      takeScreenshot: false,
    },
    'base/Drawer'
  )
