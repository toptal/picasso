import PicassoBook from '~/.storybook/components/PicassoBook'
import Timeline from '../Timeline'

const page = PicassoBook.section('Picasso Lab').createPage(
  'Timeline',
  `
  ${PicassoBook.createBaseDocsLink(
    'https://share.goabstract.com/e4c79c6c-4bcd-4411-97b7-09e821925e8e?mode=build&sha=e93949b90e728478fecb60bd7ba1efc06803315b'
  )}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Timeline, name: 'Timeline' })

page
  .createChapter()
  .addExample('Timeline/story/Default.example.tsx', 'Default') // picasso-skip-visuals
  .addExample('Timeline/story/Icons.example.tsx', 'Icons') // picasso-skip-visuals
  .addExample('Timeline/story/Dates.example.tsx', 'Dates') // picasso-skip-visuals
  .addExample('Timeline/story/TrimLastConnector.example.tsx', {
    title: 'Trim last connector',
    description:
      'You can trim last connector by passing `hasConnector={false}` to the `Timeline.Row` component. It can be useful in situation when you sort date points in the ascending order.'
  }) // picasso-skip-visuals
