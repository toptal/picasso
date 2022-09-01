import { ApplicationUpdateNotification } from '../ApplicationUpdateNotification'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Widgets').createPage(
  'ApplicationUpdateNotification',
  `${PicassoBook.createSourceLink(__filename)}`
)

page.createTabChapter('Props').addComponentDocs({
  component: ApplicationUpdateNotification,
  name: 'ApplicationUpdateNotification',
})

page
  .createChapter()
  .addExample('ApplicationUpdateNotification/story/Default.example.tsx', {
    title: 'Default',
    takeScreenshot: false,
  })
  .addExample('ApplicationUpdateNotification/story/InAction.example.tsx', {
    title: 'In Action',
    takeScreenshot: false,
  })
