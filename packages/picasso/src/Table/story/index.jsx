import tableCellStory from '../../TableCell/story'
import tableBodyStory from '../../TableBody/story'
import tableFooterStory from '../../TableFooter/story'
import tableHeadStory from '../../TableHead/story'
import tableRowStory from '../../TableRow/story'
import tableExpandableRowStory from '../../TableExpandableRow/story'
import { Table } from '../Table'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'Table',
  'Display sets of data'
)

page
  .createTabChapter('Props')
  .addComponentDocs({
    component: Table,
    name: 'Table',
    description: 'Root component representing table'
  })
  .addComponentDocs(tableHeadStory.componentDocs)
  .addComponentDocs(tableFooterStory.componentDocs)
  .addComponentDocs(tableBodyStory.componentDocs)
  .addComponentDocs(tableRowStory.componentDocs)
  .addComponentDocs(tableCellStory.componentDocs)
  .addComponentDocs(tableExpandableRowStory.componentDocs)

page
  .createChapter()
  .addExample('Table/story/Default.example.jsx', 'Plain table')
  .addExample('Table/story/Select.example.jsx', 'Selectable table')
  .addExample('Table/story/ExpandableRows.example.tsx', {
    title: 'Expandable rows',
    effect: async (testPage, makeScreenshot) => {
      await testPage.click('[data-testid="expand-button-1"]')

      await makeScreenshot()
    },
    waitUntilImagesLoaded: true
  })

page.connect(tableCellStory.chapter)
