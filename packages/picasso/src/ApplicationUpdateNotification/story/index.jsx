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
  .addExample('ApplicationUpdateNotification/story/Actions.example.tsx', {
    title: 'With Actions',
    takeScreenshot: true,
  })
  .addExample(
    'ApplicationUpdateNotification/story/ActionsAlignment.example.tsx',
    {
      title: 'Actions Alignment',
      takeScreenshot: true,
    }
  )
  .addExample('ApplicationUpdateNotification/story/Dismissable.example.tsx', {
    title: 'Dismissable',
    takeScreenshot: true,
  })
  .addExample('ApplicationUpdateNotification/story/InAction.example.tsx', {
    title: 'In Action',
    takeScreenshot: true,
  })
  .addExample(
    'ApplicationUpdateNotification/story/InActionActions.example.tsx',
    {
      title: 'In Action with Action Buttons',
      takeScreenshot: true,
    }
  )
  .addExample(
    'ApplicationUpdateNotification/story/InActionNotDismissable.example.tsx',
    {
      title: 'In Action not Dismissable',
      takeScreenshot: true,
    }
  )
