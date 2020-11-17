import { DetailedListColumn } from '../DetailedListColumn'
import PicassoBook from '~/.storybook/components/PicassoBook'

const componentDocs = PicassoBook.createComponentDocs(
  DetailedListColumn,
  'DetailedList.Column',
  undefined,
  {
    children: {
      type: {
        name: 'DetailedList.Item[]'
      }
    }
  }
)

export default {
  componentDocs
}
