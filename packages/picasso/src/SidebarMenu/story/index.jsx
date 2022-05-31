import { SidebarMenu } from '../SidebarMenu'
import PicassoBook from '~/.storybook/components/PicassoBook'

const componentDocs = PicassoBook.createComponentDocs(
  SidebarMenu,
  'Sidebar.Menu'
)

export default {
  componentDocs,
}
