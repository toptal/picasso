import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Widgets').createPage(
  'ApplicationUpdateNotification',
  null
)

page
  .createChapter()
  .addExample('ApplicationUpdateNotification/story/Default.example.tsx', {
    title: 'Default'
  })
  .addExample('ApplicationUpdateNotification/story/InAction.example.tsx', {
    title: 'In Action'
  })
