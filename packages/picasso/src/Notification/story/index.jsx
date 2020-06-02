import notificationsStreamStory from '../../utils/Notifications/story'
import notificationActionStory from '../../NotificationActions/story'
import { Notification } from '../Notification'
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
  .addExample('Notification/story/Default.example.jsx', 'Default')
  .addExample('Notification/story/Variants.example.jsx', 'Variants')
  .addExample('Notification/story/Close.example.jsx', 'Closable notification')
  .addExample('Notification/story/BoxShadow.example.jsx', 'Elevated')
  .addExample('Notification/story/FullWidth.example.jsx', 'Full width')
  .addExample('Notification/story/Icon.example.jsx', 'Custom Icon')
  .addExample('Notification/story/Actions.example.jsx', 'With Action')

page.connect(notificationsStreamStory.chapter)
