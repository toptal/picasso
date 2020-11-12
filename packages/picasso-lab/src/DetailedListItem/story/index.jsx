import { DetailedListItem } from '../DetailedListItem'
import PicassoBook from '~/.storybook/components/PicassoBook'

const componentDocs = PicassoBook.createComponentDocs(
  DetailedListItem,
  'DetailedList.Item'
)

export default {
  componentDocs
}
