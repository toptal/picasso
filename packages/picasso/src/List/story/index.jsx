import { List } from '../List'
import listItemStory from '../../ListItem/story'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage('List', null)

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
          enums: ['ordered', 'unordered']
        }
      },
      start: {
        name: 'start',
        defaultValue: '1',
        type: {
          name: 'number'
        },
        description:
          'Specifies the start value of the first list item in an ordered list'
      }
    }
  })
  .addComponentDocs(listItemStory.componentDocs)

page
  .createChapter()
  .addExample('List/story/Ordered.example.tsx', 'Ordered')
  .addExample(
    'List/story/OrderedWithStart.example.tsx',
    'Ordered with custom start'
  )
  .addExample('List/story/Unordered.example.tsx', 'Unordered')
  .addExample('List/story/Custom.example.tsx', 'Custom')
