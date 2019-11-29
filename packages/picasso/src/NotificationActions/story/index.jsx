import PicassoBook from '~/.storybook/components/PicassoBook'

import { NotificationActions } from '../NotificationActions'

const componentDocs = PicassoBook.createComponentDocs(
  NotificationActions,
  'Notification.Actions',
  `Notification actions`
)

export default {
  componentDocs
}
