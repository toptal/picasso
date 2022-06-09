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
  .addExample('List/story/Ordered.example.tsx', {
    title: 'Ordered',
    takeScreenshot: false,
  })
  .addExample('List/story/OrderedWithStart.example.tsx', {
    title: 'Ordered with custom start',
    takeScreenshot: false,
  })
  .addExample('List/story/Unordered.example.tsx', {
    title: 'Unordered',
    takeScreenshot: false,
  })
  .addExample('List/story/Custom.example.tsx', {
    title: 'Custom',
    takeScreenshot: false,
  })
