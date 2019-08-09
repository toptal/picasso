import PicassoBook from '~/.storybook/components/PicassoBook'

import { SidebarItem } from '../SidebarItem'

const componentDocs = PicassoBook.createComponentDocs(
  SidebarItem,
  'Sidebar.Item'
)

export default {
  componentDocs
}
