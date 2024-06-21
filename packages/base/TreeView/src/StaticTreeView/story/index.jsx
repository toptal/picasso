import StaticTreeView from '../StaticTreeView'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'StaticTreeView',
  `Allows rendering a static variant of tree view

   ${PicassoBook.createSourceLink(__filename)}
  `
)

page.createTabChapter('Props').addComponentDocs({
  component: StaticTreeView,
  name: 'StaticTreeView',
})

page
  .createChapter()
  .addExample(
    'StaticTreeView/story/Default.example.tsx',
    {
      title: 'Default',
      takeScreenshot: false,
    },
    'base/TreeView'
  )
  .addExample(
    'StaticTreeView/story/Horizontal.example.tsx',
    {
      title: 'Horizontal Direction',
    },
    'base/TreeView'
  )
  .addExample(
    'StaticTreeView/story/Compact.example.tsx',
    {
      title: 'Compact tree',
      description:
        'Example of a compact tree - one with only single node on each depth that has children',
    },
    'base/TreeView'
  )
