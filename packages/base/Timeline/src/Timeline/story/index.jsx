import PicassoBook from '~/.storybook/components/PicassoBook'
import timelineRowStory from '../../TimelineRow/story'
import Timeline from '../Timeline'

const page = PicassoBook.section('Components').createPage(
  'Timeline',
  `

  ${PicassoBook.createSourceLink(__filename)}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Timeline, name: 'Timeline' })
  .addComponentDocs(timelineRowStory.componentDocs)

page
  .createChapter()
  .addExample('Timeline/story/Default.example.tsx', 'Default', 'base/Timeline')
  .addExample('Timeline/story/Dates.example.tsx', 'Dates', 'base/Timeline')
  .addExample(
    'Timeline/story/TrimLastConnector.example.tsx',
    {
      title: 'Trim last connector',
      description:
        'You can trim last connector by passing `hasConnector={false}` to the `Timeline.Row` component. It can be useful in situation when you sort date points in the ascending order.',
    },
    'base/Timeline'
  )
