import { Collapse } from '../Collapse'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Transitions').createPage('Collapse')

page.createTabChapter('Props').addComponentDocs({
  component: Collapse,
  name: 'Collapse',
})

page
  .createChapter()
  .addExample(
    'Collapse/story/Default.example.tsx',
    {
      title: 'Default',
      takeScreenshot: false,
    },
    'base/Collapse'
  )
  .addExample(
    'Collapse/story/AppearOnRender.example.tsx',
    {
      title: 'Appear on render',
      takeScreenshot: false,
    },
    'base/Collapse'
  )
