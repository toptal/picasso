import { List } from '../List'
import listItemStory from '../../ListItem/story'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'List',
  `${PicassoBook.createSourceLink(__filename)}`
)

page
  .createTabChapter('Props')
  .addComponentDocs({
    component: List,
    name: 'List',
    additionalDocs: {
      variant: {
        name: 'variant',
        defaultValue: 'unordered',
        type: {
          name: 'enum',
          enums: ['ordered', 'unordered'],
        },
      },
      start: {
        name: 'start',
        defaultValue: '1',
        type: {
          name: 'number',
        },
        description:
          'Specifies the start value of the first list item in an ordered list',
      },
    },
  })
  .addComponentDocs(listItemStory.componentDocs)

page
  .createChapter()
  .addExample('List/story/Ordered.example.tsx', 'Ordered', 'base/List')
  .addExample(
    'List/story/OrderedWithStart.example.tsx',
    'Ordered with custom start',
    'base/List'
  )
  .addExample('List/story/Unordered.example.tsx', 'Unordered', 'base/List')
  .addExample('List/story/Nested.example.tsx', 'Nested', 'base/List')
  .addExample('List/story/Styles.example.tsx', 'Styles', 'base/List')
