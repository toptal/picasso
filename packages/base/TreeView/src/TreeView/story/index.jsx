import TreeView from '../TreeView'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'TreeView',
  `Allows rendering a tree view
  
  ${PicassoBook.createSourceLink(__filename)}
  `
)

page.createTabChapter('Props').addComponentDocs({
  component: TreeView,
  name: 'TreeView',
})

// Skipping visuals because the TreeView has a centering transition on render which takes unknown time
page
  .createChapter()
  .addExample(
    'TreeView/story/Default.example.tsx',
    {
      title: 'Default',
      takeScreenshot: false,
    },
    'base/TreeView'
  )
  .addExample(
    'TreeView/story/Selected.example.tsx',
    {
      title: 'With selected node',
      description:
        "To set the particular node selected, you need to set `node`'s attribute *selected* to `true`. Also there is additional attribute `selectedOffset` for adding an scroll offset for particular node",
      takeScreenshot: false,
    },
    'base/TreeView'
  )
  .addExample(
    'TreeView/story/Modal.example.tsx',
    {
      title: 'With Modal',
      takeScreenshot: false,
    },
    'base/TreeView'
  )
  .addExample(
    'TreeView/story/CustomZoom.example.tsx',
    {
      title: 'Custom Zoom',
      takeScreenshot: false,
    },
    'base/TreeView'
  )
  .addExample(
    'TreeView/story/AvatarSize.example.tsx',
    {
      title: 'Avatar Size',
      takeScreenshot: false,
    },
    'base/TreeView'
  )
  .addExample(
    'TreeView/story/Horizontal.example.tsx',
    {
      title: 'Horizontal Direction',
      takeScreenshot: false, // Already covered by StaticTreeView
    },
    'base/TreeView'
  )
  .addExample(
    'TreeView/story/Compact.example.tsx',
    {
      title: 'Compact tree',
      takeScreenshot: false, // Already covered by StaticTreeView
      description:
        'Example of a compact tree - one with only single node on each depth that has children',
    },
    'base/TreeView'
  )
  .addExample(
    'TreeView/story/TreeNodeAvatar.example.tsx',
    {
      title: 'TreeNodeAvatar',
      description:
        'A complementary component to render an avatar for a tree view node',
    },
    'base/TreeView'
  )
