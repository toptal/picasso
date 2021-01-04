import TreeView from '../TreeView'
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
  .addExample('TreeView/story/Default.example.tsx', {
    title: 'Default'
  })
  .addExample('TreeView/story/Selected.example.tsx', {
    title: 'With selected node',
    description:
      "To set the particular node selected, you need to set `node`'s attribute *selected* to `true`. Also there is additional attribute `selectedOffset` for adding an scroll offset for particular node"
  })
  .addExample('TreeView/story/Modal.example.tsx', {
    title: 'With Modal',
    effect: async (testPage, makeScreenshot) => {
      await testPage.click('[data-testid="open"]')
      await testPage.waitFor('[data-testid="tree-dialog-content"]')
      await makeScreenshot({
        isFullScreen: true
      })
    }
  })
  .addExample('TreeView/story/CustomZoom.example.tsx', {
    title: 'Custom Zoom'
  })
  .addExample('TreeView/story/AvatarSize.example.tsx', {
    title: 'Avatar Size'
  })
