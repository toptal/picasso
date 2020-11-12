import TreeView from '../TreeView'
// @ts-ignore
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Lab').createPage(
  'TreeView',
  'Allows rendering a tree view'
)

page.createTabChapter('Props').addComponentDocs({
  component: TreeView,
  name: 'TreeView'
})

page
  .createChapter()
  .addExample('TreeView/story/Default.example.tsx', 'Default')
  .addExample('TreeView/story/Selected.example.tsx', {
    title: 'With selected node',
    description:
      "To set the particular node selected, you need to set `node`'s attribute *selected* to `true`. Also there is additional attribute `selectedOffset` for adding an scroll offset for particular node"
  })
  .addExample('TreeView/story/Modal.example.tsx', 'With Modal')
  .addExample('TreeView/story/CustomZoom.example.tsx', 'Custom Zoom')
  .addExample('TreeView/story/AvatarSize.example.tsx', 'Avatar Size')
