import notificationsStreamStory from '../../utils/Notifications/story'
import notificationActionStory from '../../NotificationActions/story'
import Notification from '../Notification'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'Notification',
  'Notification standard way to notify user about important information'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Notification, name: 'Notification' })
  .addComponentDocs(notificationActionStory.componentDocs)

page
  .createChapter()
  .addExample('Notification/story/Default.example.tsx', 'Default')
  .addExample('Notification/story/Close.example.tsx', 'Closable notification')
  .addExample('Notification/story/FullWidth.example.tsx', 'Full width')
  .addExample('Notification/story/Actions.example.tsx', 'With Action')

page.connect(notificationsStreamStory.chapter)
