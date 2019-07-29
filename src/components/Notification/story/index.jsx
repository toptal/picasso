import PicassoBook from '~/.storybook/components/PicassoBook'

import notificationsStreamStory from '../../utils/Notifications/story'
import { Notification } from '../Notification'

const page = PicassoBook.createPage(
  'Notification',
  'Notification standard way to notify user about important information',
  'Components'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Notification, name: 'Notification' })

page
  .createChapter()
  .addExample('Notification/story/Default.example.jsx', 'Default')
  .addExample('Notification/story/Variants.example.jsx', 'Variants')
  .addExample('Notification/story/Close.example.jsx', 'Closable notification')
  .addExample('Notification/story/BoxShadow.example.jsx', 'Elevated')
  .addExample('Notification/story/FullWidth.example.jsx', 'Full width')
  .addExample('Notification/story/Icon.example.jsx', 'Custom Icon')

page.connect(notificationsStreamStory.chapter)
