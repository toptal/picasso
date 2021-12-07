import TreeView from '../TreeView'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'TreeView',
  'Allows rendering a tree view'
)

page.createTabChapter('Props').addComponentDocs({
  component: TreeView,
  name: 'TreeView'
})

// Skipping visuals because the TreeView has a centering transition on render which takes unknown time
page
  .createChapter()
  .addExample('TreeView/story/Default.example.tsx', {
    title: 'Default'
  }) // picasso-skip-visuals
  .addExample('TreeView/story/Selected.example.tsx', {
    title: 'With selected node',
    description:
      "To set the particular node selected, you need to set `node`'s attribute *selected* to `true`. Also there is additional attribute `selectedOffset` for adding an scroll offset for particular node"
  }) // picasso-skip-visuals
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
  }) // picasso-skip-visuals
  .addExample('TreeView/story/AvatarSize.example.tsx', {
    title: 'Avatar Size'
  }) // picasso-skip-visuals
  .addExample('TreeView/story/Horizontal.example.tsx', {
    title: 'Horizontal Direction'
  }) // picasso-skip-visuals
  .addExample('TreeView/story/Compact.example.tsx', {
    title: 'Compact tree',
    description:
      'Example of a compact tree - one with only single node on each depth that has children'
  }) // picasso-skip-visuals
