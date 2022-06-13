import { HelpboxContent } from '../HelpboxContent'
import PicassoBook from '~/.storybook/components/PicassoBook'

const componentDocs = PicassoBook.createComponentDocs(
  HelpboxContent,
  'Helpbox.Content'
)

export default {
  componentDocs,
}
