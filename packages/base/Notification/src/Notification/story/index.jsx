import notificationsStreamStory from '../../use-notification/story'
import notificationActionStory from '../../NotificationActions/story'
import Notification from '../Notification'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'Notification',
  `
    Notification standard way to notify user about important information

    ${PicassoBook.createSourceLink(__filename)}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Notification, name: 'Notification' })
  .addComponentDocs(notificationActionStory.componentDocs)

page
  .createChapter()
  .addExample(
    'Notification/story/Default.example.tsx',
    'Default',
    'base/Notification'
  )
  .addExample(
    'Notification/story/Actions.example.tsx',
    'With Action',
    'base/Notification'
  )

page.connect(notificationsStreamStory.chapter)
