import PicassoBook from '~/.storybook/components/PicassoBook'

import tableCellStory from '@components/TableCell/story'
import tableBodyStory from '@components/TableBody/story'
import tableFooterStory from '@components/TableFooter/story'
import tableHeadStory from '@components/TableHead/story'
import tableRowStory from '@components/TableRow/story'
import tableExpandableRowStory from '@components/TableExpandableRow/story'

import { Table } from '../Table'

const page = PicassoBook.createPage('Table', `Display sets of data`)

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
  .addExample('Table/story/ExpandableRows.example.tsx', 'Expandable rows', {
    effect: async (testPage, makeScreenshot) => {
      await testPage.click('[data-testid="expand-button-1"]')

      await makeScreenshot()
    },
    waitUntilImagesLoaded: true
  })

page.connect(tableCellStory.chapter)
