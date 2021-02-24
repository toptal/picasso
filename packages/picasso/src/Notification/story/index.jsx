import notificationsStreamStory from '../../utils/Notifications/story'
import notificationActionStory from '../../NotificationActions/story'
import Notification from '../Notification'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'Notification',
  `
    Notification standard way to notify user about important information
    
    ${PicassoBook.createBaseDocsLink(
      'https://share.goabstract.com/aa04519f-5383-4555-9574-521d7afec32d?collectionLayerId=363d365b-d0db-4db2-a7d3-08c83c092930&mode=design&present=true'
    )}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Notification, name: 'Notification' })
  .addComponentDocs(notificationActionStory.componentDocs)

page
  .createChapter()
  .addExample('Notification/story/Default.example.tsx', 'Default')
  .addExample('Notification/story/Actions.example.tsx', 'With Action')

page.connect(notificationsStreamStory.chapter)
