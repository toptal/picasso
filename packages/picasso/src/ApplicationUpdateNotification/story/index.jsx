import { ApplicationUpdateNotification } from '../ApplicationUpdateNotification'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Widgets').createPage(
  'ApplicationUpdateNotification',
  null
)

page
  .createTabChapter('Props')
  .addComponentDocs({
    component: ApplicationUpdateNotification,
    name: 'ApplicationUpdateNotification'
  })

page
  .createChapter()
  .addExample('ApplicationUpdateNotification/story/Default.example.tsx', {
    title: 'Default'
  }) // picasso-skip-visuals
  .addExample('ApplicationUpdateNotification/story/InAction.example.tsx', {
    title: 'In Action'
  }) // picasso-skip-visuals
