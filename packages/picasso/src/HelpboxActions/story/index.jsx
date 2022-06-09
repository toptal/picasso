import { HelpboxActions } from '../HelpboxActions'
import PicassoBook from '~/.storybook/components/PicassoBook'

const componentDocs = PicassoBook.createComponentDocs(
  HelpboxActions,
  'Helpbox.Actions'
)

export default {
  componentDocs,
}
