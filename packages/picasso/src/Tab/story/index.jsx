import PicassoBook from '~/.storybook/components/PicassoBook'

import { Tab } from '../Tab'

const componentDocs = PicassoBook.createComponentDocs(Tab, 'Tabs.Tab')

const chapter = PicassoBook.connectToPage(page => {
  page
    .createChapter('Tabs.Tab')
    .addExample('Tab/story/Disabled.example.jsx', 'Disabled tab')
    .addExample('Tab/story/CustomValue.example.jsx', 'Using custom value')
})

export default {
  chapter,
  componentDocs
}
