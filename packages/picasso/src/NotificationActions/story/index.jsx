import { NotificationActions } from '../NotificationActions'
import PicassoBook from '~/.storybook/components/PicassoBook'

const componentDocs = PicassoBook.createComponentDocs(
  NotificationActions,
  'Notification.Actions',
  'Notification actions'
)

export default {
  componentDocs,
}
