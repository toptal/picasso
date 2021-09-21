import tableCellStory from '../../TableCell/story'
import tableBodyStory from '../../TableBody/story'
import tableFooterStory from '../../TableFooter/story'
import tableHeadStory from '../../TableHead/story'
import tableSectionHeadStory from '../../TableSectionHead/story'
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
    description: 'Root component representing table',
    additionalDocs: {
      spacing: {
        name: 'spacing',
        type: { name: 'enum', enums: ['"regular"', '"compact"', '"narrow"'] },
        description: 'Inner spacing'
      },
      variant: {
        name: 'variant',
        type: { name: 'enum', enums: ['"clear"', '"bordered"', '"striped"'] },
        description: 'Appearance variant'
      }
    }
  })
  .addComponentDocs(tableHeadStory.componentDocs)
  .addComponentDocs(tableSectionHeadStory.componentDocs)
  .addComponentDocs(tableFooterStory.componentDocs)
  .addComponentDocs(tableBodyStory.componentDocs)
  .addComponentDocs(tableRowStory.componentDocs)
  .addComponentDocs(tableCellStory.componentDocs)
  .addComponentDocs(tableExpandableRowStory.componentDocs)

page
  .createChapter()
  .addExample('Table/story/Default.example.tsx', 'Plain table') // picasso-skip-visuals
  .addExample('Table/story/Variants.example.tsx', 'Appearance variants') // picasso-skip-visuals
  .addExample('Table/story/Spacings.example.tsx', 'Inner spacing') // picasso-skip-visuals
  .addExample('Table/story/Alignments.example.tsx', 'Cell alignments') // picasso-skip-visuals
  .addExample('Table/story/Select.example.tsx', 'Selectable table') // picasso-skip-visuals
  .addExample(
    'Table/story/SectionHeader.example.tsx',
    'Table with section header'
  ) // picasso-skip-visuals
  .addExample(
    'Table/story/MultipleSectionHeader.example.tsx',
    'Table with multiple sections'
  ) // picasso-skip-visuals
  .addExample('Table/story/ExpandableRows.example.tsx', 'Expandable rows') // picasso-skip-visuals
  .addExample(
    'Table/story/ExpandableRowsDefaultExpanded.example.tsx',
    'Expandable rows, expanded by default'
  ) // picasso-skip-visuals

page.connect(tableCellStory.chapter)
